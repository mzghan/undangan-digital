import type { TimelineSetRequest, TimelineResponse } from "../types/timeline";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function setWeddingDate(
  payload: TimelineSetRequest,
): Promise<TimelineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/trial/timeline/set`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan tanggal pernikahan");
  }
  return response.json();
}

export async function getTimeline(
  sessionId: string,
): Promise<TimelineResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/timeline/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil timeline");
  }
  return response.json();
}
