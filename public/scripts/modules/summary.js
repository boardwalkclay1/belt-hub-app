import { api } from "/scripts/modules/api.js";

document.getElementById("btn-end-ride").addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem("beltHubUser"));
  const bikeId = localStorage.getItem("currentBikeId");

  const res = await api("/rentals-end", "POST", {
    userId: user.id,
    bikeId,
    endTime: Date.now()
  });

  document.getElementById("summary-bike-id").textContent = "#" + res.bikeId;
  document.getElementById("summary-duration").textContent = res.duration;
  document.getElementById("summary-cost").textContent = res.cost.toFixed(2);
  document.getElementById("summary-return").textContent = res.returned.toFixed(2);
});
