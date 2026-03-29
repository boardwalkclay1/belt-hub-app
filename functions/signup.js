export async function onRequestPost(context) {
  const { name, email, password } = await context.request.json();

  // TEMP: Fake signup success
  return Response.json({
    ok: true,
    user: { id: Date.now(), name, email }
  });
}
