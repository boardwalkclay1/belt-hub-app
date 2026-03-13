export function startRental(bikeId) {
  const start = Date.now();
  const rental = { bikeId, start };
  localStorage.setItem("activeRental", JSON.stringify(rental));
  return rental;
}

export function endRental() {
  const rental = JSON.parse(localStorage.getItem("activeRental"));
  if (!rental) return null;

  const duration = Date.now() - rental.start;
  const hours = duration / 1000 / 3600;
  const cost = +(hours * 25).toFixed(2);
  const returned = +(100 - cost).toFixed(2);

  localStorage.removeItem("activeRental");

  return { ...rental, duration, cost, returned };
}

export function formatDuration(ms) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
