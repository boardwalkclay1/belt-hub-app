import { api } from "/scripts/modules/api.js";

const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.add("hidden"));
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

// ===== LOGIN =====
document.getElementById("btn-login").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;

  const res = await api("/auth-login", "POST", { email, password });

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(res.user));
    showPage("page-home");
  } else {
    alert(res.error);
  }
});

// ===== MOCK SCAN =====
document.getElementById("btn-mock-scan").addEventListener("click", async () => {
  const res = await api("/bikes-scan", "POST", { qr: "14" });

  if (!res.ok) {
    alert(res.error);
    return;
  }

  currentBikeId = res.bikeId;
  document.getElementById("ride-bike-id").textContent = "#" + currentBikeId;

  await startRideOnBackend();
  showPage("page-ride");
});

// ===== START RIDE =====
async function startRideOnBackend() {
  const user = JSON.parse(localStorage.getItem("user"));

  await api("/rentals-start", "POST", {
    userId: user.id,
    bikeId: currentBikeId,
    startTime: Date.now()
  });

  rideStart = new Date();
  rideTimerInterval = setInterval(updateRideTimer, 1000);
}

// ===== END RIDE =====
document.getElementById("btn-end-ride").addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await api("/rentals-end", "POST", {
    userId: user.id,
    bikeId: currentBikeId,
    endTime: Date.now()
  });

  document.getElementById("summary-bike-id").textContent = "#" + res.bikeId;
  document.getElementById("summary-duration").textContent = res.duration;
  document.getElementById("summary-cost").textContent = res.cost.toFixed(2);
  document.getElementById("summary-return").textContent = res.returned.toFixed(2);

  showPage("page-summary");
});

// default
showPage("page-welcome");
