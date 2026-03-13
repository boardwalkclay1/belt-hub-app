export async function onRequestPost(context) {
  const body = await context.request.json();
  const { userId, bikeId, startTime } = body;

  // TODO: insert rental into D1
  return Response.json({ ok: true });
}
