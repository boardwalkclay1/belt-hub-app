// ===============================
// 🔗 BASE URL (Cloudflare Pages Functions)
// ===============================
// Cloudflare automatically serves your functions at:
// https://your-domain.com/api/<function>
//
// So the base is ALWAYS just "/api"
export const API_BASE = "/api";


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
