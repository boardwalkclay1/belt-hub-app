// app.js (Worker-connected version)
import { api } from "./modules/api.js";

const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.add("hidden"));
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

// basic nav
document.addEventListener("click", e => {
  const go = e.target.getAttribute("data-go");
  if (go) {
    showPage(go);
  }
});

// ===== AUTH =====
const loginBtn = document.getElementById("btn-login");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const emailEl = document.getElementById("auth-email");
    const passEl = document.getElementById("auth-password");

    const email = emailEl ? emailEl.value.trim() : "";
    const password = passEl ? passEl.value.trim() : "";

    const res = await api("/auth/login", "POST", { email, password });

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(res.user));
      showPage("page-home");
    } else {
      alert(res.error || "Login failed");
    }
  });
}

// ===== RIDE STATE =====
let currentBikeId = null;
let rideStart = null;
let rideTimerInterval = null;

function updateRideTimer() {
  if (!rideStart) return;
  const now = new Date();
  const diffMs = now - rideStart;
  const totalSeconds = Math.floor(diffMs / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  document.getElementById("ride-timer").textContent = `${h}:${m}:${s}`;
}

async function startRideOnBackend() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    alert("Not logged in");
    showPage("page-welcome");
    return false;
  }

  const res = await api("/rentals/start", "POST", {
    userId: user.id,
    bikeId: currentBikeId,
    startTime: Date.now()
  });

  if (!res.ok) {
    alert(res.error || "Could not start ride");
    return false;
  }

  rideStart = new Date();
  if (rideTimerInterval) clearInterval(rideTimerInterval);
  rideTimerInterval = setInterval(updateRideTimer, 1000);
  return true;
}

// ===== MOCK SCAN (NOW HITS WORKER) =====
const mockScanBtn = document.getElementById("btn-mock-scan");
if (mockScanBtn) {
  mockScanBtn.addEventListener("click", async () => {
    const res = await api("/bikes/scan", "POST", { qr: "14" });

    if (!res.ok) {
      alert(res.error || "Bike not available");
      return;
    }

    currentBikeId = res.bikeId; // e.g. 14
    document.getElementById("ride-bike-id").textContent = `#${currentBikeId}`;

    const started = await startRideOnBackend();
    if (started) {
      showPage("page-ride");
    }
  });
}

// ===== END RIDE (NOW HITS WORKER) =====
const endRideBtn = document.getElementById("btn-end-ride");
if (endRideBtn) {
  endRideBtn.addEventListener("click", async () => {
    if (!rideStart) return;
    clearInterval(rideTimerInterval);

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      alert("Not logged in");
      showPage("page-welcome");
      return;
    }

    const res = await api("/rentals/end", "POST", {
      userId: user.id,
      bikeId: currentBikeId,
      endTime: Date.now()
    });

    if (!res.ok) {
      alert(res.error || "Could not end ride");
      return;
    }

    // Worker returns: bikeId, duration, cost, returned
    document.getElementById("summary-bike-id").textContent = `#${res.bikeId}`;
    document.getElementById("summary-duration").textContent = res.duration;
    document.getElementById("summary-cost").textContent = res.cost.toFixed(2);
    document.getElementById("summary-return").textContent = res.returned.toFixed(2);

    showPage("page-summary");
  });
}

// default
showPage("page-welcome");
