import { getSession } from "/scripts/auth.js";

const page = document.body.dataset.page;
const session = getSession();

const publicPages = ["welcome", "auth"];

if (!session && !publicPages.includes(page)) {
  window.location.href = "welcome.html";
}
