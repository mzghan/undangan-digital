import type {
  TimelinePremiumSetRequest,
  TimelinePremiumResponse,
} from "../types/timelinePremium";
import type { ChecklistItemPremium } from "../types/checklistPremium";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function setWeddingDatePremium(
  payload: TimelinePremiumSetRequest,
): Promise<TimelinePremiumResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/timeline-premium/set`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menyimpan tanggal pernikahan");
  }
  return response.json();
}

export async function getTimelinePremium(
  sessionId: string,
): Promise<TimelinePremiumResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/timeline-premium/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil timeline");
  }
  return response.json();
}

export async function resetDeadlineToRecommended(
  itemId: number,
): Promise<ChecklistItemPremium> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/timeline-premium/item/${itemId}/reset`,
    { method: "PATCH" },
  );
  if (!response.ok) {
    throw new Error("Gagal mereset deadline ke rekomendasi");
  }
  return response.json();
}
