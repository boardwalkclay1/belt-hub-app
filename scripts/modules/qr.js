let stream = null;

export async function startCamera(videoEl) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    videoEl.srcObject = stream;
    await videoEl.play();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export function stopCamera() {
  if (!stream) return;
  stream.getTracks().forEach(t => t.stop());
  stream = null;
}

// Placeholder for real QR decoding
export async function decodeFrame(videoEl) {
  // This is where your backend or QR library will plug in.
  return null;
}
