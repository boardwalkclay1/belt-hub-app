export function fillSummary(data) {
  document.getElementById("summary-bike-id").textContent = `#${data.bikeId}`;
  document.getElementById("summary-duration").textContent = data.durationFormatted;
  document.getElementById("summary-cost").textContent = data.cost.toFixed(2);
  document.getElementById("summary-return").textContent = data.returned.toFixed(2);
}
