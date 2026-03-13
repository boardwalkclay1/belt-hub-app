export async function onRequestPost(context) {
  const body = await context.request.json();
  const { qr } = body;

  // TODO: lookup bike in D1
  return Response.json({ ok: true, bikeId: qr });
}
