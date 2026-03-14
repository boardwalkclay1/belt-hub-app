// /scripts/auth.js
// Pure localStorage mock auth module

const STORAGE_KEY = "beltHubUser";

/* ---------------------------
   HELPERS
---------------------------- */
function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function loadUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/* ---------------------------
   LOGIN
---------------------------- */
export function login(email, password) {
  if (!email || !password) {
    return { ok: false, error: "Missing fields" };
  }

  // Mock user object (replace with backend later)
  const user = {
    id: crypto.randomUUID(),
    email,
    name: email.split("@")[0],
    token: "mock-token",
  };

  saveUser(user);

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
    id: crypto.randomUUID(),
    email,
    name,
    token: "mock-token",
  };

  saveUser(user);

  return { ok: true, user };
}

/* ---------------------------
   SESSION
---------------------------- */
export function getSession() {
  return loadUser();
}

/* ---------------------------
   LOGOUT
---------------------------- */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
