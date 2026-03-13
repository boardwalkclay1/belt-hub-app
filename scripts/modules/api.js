// ===============================
// 🔗 BASE URL (EDIT THIS ONLY)
// ===============================
// Cloudflare Pages Functions automatically live at:
// https://your-domain.com/.netlify/functions/<file>
// BUT Cloudflare uses:
// https://your-domain.com/api/<file>
//
// So your base is simply your domain + "/api"
export const API_BASE = "https://your-domain.com/api";


// ===============================
// 📡 UNIVERSAL API WRAPPER
// ===============================
export async function api(path, method = "GET", data = null) {
  const url = API_BASE + path;

  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
