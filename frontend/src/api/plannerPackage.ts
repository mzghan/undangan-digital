import type { PlannerPackage } from "../types/plannerPackage";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getPlannerPackages(): Promise<PlannerPackage[]> {
  const response = await fetch(`${API_BASE_URL}/api/planner-packages/`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data planner package");
  }
  return response.json();
}
