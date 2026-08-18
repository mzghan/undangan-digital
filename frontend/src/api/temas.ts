import type { Tema } from "../types/tema";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getTemas(): Promise<Tema[]> {
  const response = await fetch(`${API_BASE_URL}/api/temas/`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data tema");
  }
  return response.json();
}
