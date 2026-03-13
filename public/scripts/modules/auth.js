// /scripts/auth.js (module)

const STORAGE_KEY = "beltHubUser";

/* ---------------------------
   LOGIN
---------------------------- */
export function login(email, password) {
  if (!email || !password) {
    return { ok: false, error: "Missing fields" };
  }

  // Mock user object (replace with backend later)
  const user = {
    email,
    name: email.split("@")[0],
    token: "mock-token",
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  return { ok: true, user };
}

/* ---------------------------
   SIGNUP
---------------------------- */
export function signup(email, password, name) {
  if (!email || !password || !name) {
    return { ok: false, error: "Missing fields" };
  }

  const user = {
    email,
    name,
    token: "mock-token",
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  return { ok: true, user };
}

/* ---------------------------
   SESSION
---------------------------- */
export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/* ---------------------------
   LOGOUT
---------------------------- */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
