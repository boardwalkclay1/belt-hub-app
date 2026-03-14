import { login, signup } from "/scripts/auth.js";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode") || "login";

const title = document.getElementById("auth-title");
const switchLink = document.getElementById("switch-link");
const signupExtra = document.getElementById("signup-extra");
const btn = document.getElementById("btn-auth");

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

btn.addEventListener("click", () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  const name = document.getElementById("auth-name")?.value;

  const res = mode === "signup"
    ? signup(email, password, name)
    : login(email, password);

  if (!res.ok) {
    alert(res.error);
    return;
  }

  window.location.href = "index.html";
});
