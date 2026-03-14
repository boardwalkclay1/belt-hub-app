import { api } from "/scripts/modules/api.js";

document.getElementById("btn-mock-scan").addEventListener("click", async () => {
  const res = await api("/bikes-scan", "POST", { qr: "14" });

  if (!res.ok) {
    alert(res.error);
    return;
  }

  localStorage.setItem("currentBikeId", res.bikeId);
  window.location.href = "ride.html";
});
