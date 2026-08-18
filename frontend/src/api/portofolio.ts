import type { Portofolio } from "../types/portofolio";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getPortofolio(): Promise<Portofolio[]> {
  const response = await fetch(`${API_BASE_URL}/api/portofolio/`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data portofolio");
  }
  return response.json();
}
