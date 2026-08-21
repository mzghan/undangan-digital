import type {
  Guest,
  GuestCreateRequest,
  GuestUpdateRequest,
  GuestSummary,
} from "../types/guest";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function addGuest(payload: GuestCreateRequest): Promise<Guest> {
  const response = await fetch(`${API_BASE_URL}/api/trial/guest-premium`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Gagal menambah tamu");
  }
  return response.json();
}

export async function listGuest(sessionId: string): Promise<Guest[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/guest-premium/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil daftar tamu");
  }
  return response.json();
}

export async function getGuestSummary(
  sessionId: string,
): Promise<GuestSummary> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/guest-premium/${sessionId}/summary`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil ringkasan tamu");
  }
  return response.json();
}

export async function updateGuest(
  guestId: number,
  payload: GuestUpdateRequest,
): Promise<Guest> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/guest-premium/item/${guestId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal memperbarui tamu");
  }
  return response.json();
}

export async function deleteGuest(guestId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/guest-premium/item/${guestId}`,
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus tamu");
  }
}
