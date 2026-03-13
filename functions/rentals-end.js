export async function onRequestPost(context) {
  const body = await context.request.json();
  const { userId, bikeId, endTime } = body;

  // TODO: calculate cost + update D1

  return Response.json({
    ok: true,
    bikeId,
    duration: "00:12:44",
    cost: 5.25,
    returned: 94.75
  });
}
