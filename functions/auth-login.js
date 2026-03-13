export async function onRequestPost(context) {
  const body = await context.request.json();
  const { email, password } = body;

  // TODO: check D1 database
  if (email === "test@test.com" && password === "1234") {
    return Response.json({ ok: true, user: { id: 1, email } });
  }

  return Response.json({ ok: false, error: "Invalid login" });
}
