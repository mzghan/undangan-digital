import type { Testimoni, TestimoniInput } from "../types/testimoni";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getTestimoni(): Promise<Testimoni[]> {
  const response = await fetch(`${API_BASE_URL}/api/testimoni/`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data testimoni");
  }
  return response.json();
}

export async function createTestimoni(
  data: TestimoniInput,
): Promise<Testimoni> {
  const response = await fetch(`${API_BASE_URL}/api/testimoni/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Gagal mengirim testimoni");
  }
  return response.json();
}
