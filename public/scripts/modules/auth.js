// -----------------------------
// API HELPERS
// -----------------------------
async function login(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}

async function signup(name, email, password) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  return res.json();
}

// -----------------------------
// PAGE MODE LOGIC
// -----------------------------
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode") || "login";

const title = document.getElementById("auth-title");
const switchLink = document.getElementById("switch-link");
const signupExtra = document.getElementById("signup-extra");
const btn = document.getElementById("btn-auth");

// Set UI based on mode
if (mode === "signup") {
  title.textContent = "Create Account";
  signupExtra.style.display = "block";
  switchLink.textContent = "Already have an account? Log in";
  switchLink.href = "auth.html?mode=login";
} else {
  title.textContent = "Sign In";
  signupExtra.style.display = "none";
  switchLink.textContent = "Need an account? Sign up";
  switchLink.href = "auth.html?mode=signup";
}

// -----------------------------
// BUTTON HANDLER
// -----------------------------
btn.addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  const name = document.getElementById("auth-name")?.value?.trim();

  if (!email || !password || (mode === "signup" && !name)) {
    alert("Please fill out all fields.");
    return;
  }

  const res = mode === "signup"
    ? await signup(name, email, password)
    : await login(email, password);

  if (!res.ok) {
    alert(res.error || "Something went wrong.");
    return;
  }

  // Save token or user info if needed
  if (res.token) localStorage.setItem("token", res.token);

  window.location.href = "index.html";
});
