import type { HashtagResponse } from "../types/hashtag";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateHashtag(
  namaPria: string,
  namaWanita: string,
): Promise<HashtagResponse> {
  const response = await fetch(`${API_BASE_URL}/api/hashtag/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nama_pria: namaPria,
      nama_wanita: namaWanita,
    }),
  });
  if (!response.ok) {
    throw new Error("Gagal generate hashtag");
  }
  return response.json();
}
