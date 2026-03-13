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

// fake auth
document.getElementById("btn-login").addEventListener("click", () => {
  // later: validate + call API
  showPage("page-home");
});

// mock bike scan
let currentBikeId = null;
document.getElementById("btn-mock-scan").addEventListener("click", () => {
  currentBikeId = "#14";
  document.getElementById("ride-bike-id").textContent = currentBikeId;
  startRide();
  showPage("page-ride");
});

// ride timer
let rideStart = null;
let rideTimerInterval = null;

function startRide() {
  rideStart = new Date();
  if (rideTimerInterval) clearInterval(rideTimerInterval);
  rideTimerInterval = setInterval(updateRideTimer, 1000);
}

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

document.getElementById("btn-end-ride").addEventListener("click", () => {
  if (!rideStart) return;
  clearInterval(rideTimerInterval);

  const end = new Date();
  const diffMs = end - rideStart;
  const minutes = diffMs / 60000;
  const hours = minutes / 60;
  const rate = 25;
  const deposit = 100;

  const cost = +(rate * hours).toFixed(2);
  const returned = +(deposit - cost).toFixed(2);

  const totalSeconds = Math.floor(diffMs / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  const durationStr = `${h}:${m}:${s}`;

  document.getElementById("summary-bike-id").textContent = currentBikeId || "#?";
  document.getElementById("summary-duration").textContent = durationStr;
  document.getElementById("summary-cost").textContent = cost.toFixed(2);
  document.getElementById("summary-return").textContent = Math.max(returned, 0).toFixed(2);

  showPage("page-summary");
});

// default
showPage("page-welcome");
