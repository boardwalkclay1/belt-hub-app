import { api } from "/scripts/modules/api.js";

let rideStart;
let rideTimerInterval;

async function startRide() {
  const user = JSON.parse(localStorage.getItem("beltHubUser"));
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
