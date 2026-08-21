import type {
  SeatingTable,
  SeatingTableCreateRequest,
  SeatingTableUpdateRequest,
  SeatingAssignRequest,
  UnassignedGuest,
} from "../types/seating";

const API_BASE_URL = "http://127.0.0.1:8000";

async function handle<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? errorMessage);
  }
  return response.json();
}

export async function addTable(
  payload: SeatingTableCreateRequest,
): Promise<SeatingTable> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/table`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return handle(response, "Gagal menambah meja");
}

export async function listTables(sessionId: string): Promise<SeatingTable[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/${sessionId}/tables`,
  );
  return handle(response, "Gagal mengambil daftar meja");
}

export async function listUnassignedGuests(
  sessionId: string,
): Promise<UnassignedGuest[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/${sessionId}/unassigned`,
  );
  return handle(response, "Gagal mengambil daftar tamu belum ditempatkan");
}

export async function updateTable(
  tableId: number,
  payload: SeatingTableUpdateRequest,
): Promise<SeatingTable> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/table/${tableId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return handle(response, "Gagal memperbarui meja");
}

export async function deleteTable(tableId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/table/${tableId}`,
    { method: "DELETE" },
  );
  await handle(response, "Gagal menghapus meja");
}

export async function assignGuest(
  payload: SeatingAssignRequest,
): Promise<SeatingTable> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/assign`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return handle(response, "Gagal menempatkan tamu");
}

export async function unassignGuest(assignmentId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/seating-premium/assign/${assignmentId}`,
    { method: "DELETE" },
  );
  await handle(response, "Gagal mengeluarkan tamu dari meja");
}
