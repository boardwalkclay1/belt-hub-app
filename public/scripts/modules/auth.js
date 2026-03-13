export function login(email, password) {
  if (!email || !password) return { ok: false, error: "Missing fields" };

  const user = { email, token: "mock-token" };
  localStorage.setItem("beltHubUser", JSON.stringify(user));

  return { ok: true, user };
}

export function getSession() {
  const raw = localStorage.getItem("beltHubUser");
  return raw ? JSON.parse(raw) : null;
}
