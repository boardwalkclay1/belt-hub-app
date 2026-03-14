import { api } from "/scripts/modules/api.js";
import { getSession } from "/scripts/auth.js";

let rideStart;
let rideTimerInterval;

async function startRide() {
  const user = getSession();
  const bikeId = localStorage.getItem("currentBikeId");

  await api("/rentals-start", "POST", {
    userId: user.id,
    bikeId,
    startTime: Date.now()
  });

  rideStart = new Date();
  rideTimerInterval = setInterval(updateRideTimer, 1000);
}

startRide();
