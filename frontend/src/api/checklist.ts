import type {
  ChecklistItem,
  ChecklistGenerateRequest,
  ChecklistItemCreateRequest,
  ChecklistItemUpdateRequest,
} from "../types/checklist";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateChecklist(
  payload: ChecklistGenerateRequest,
): Promise<ChecklistItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/trial/checklist/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Gagal membuat checklist");
  }
  return response.json();
}

export async function getChecklist(
  sessionId: string,
): Promise<ChecklistItem[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil checklist");
  }
  return response.json();
}

export async function addChecklistItem(
  payload: ChecklistItemCreateRequest,
): Promise<ChecklistItem> {
  const response = await fetch(`${API_BASE_URL}/api/trial/checklist/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Gagal menambah item checklist");
  }
  return response.json();
}

export async function updateChecklistItem(
  itemId: number,
  payload: ChecklistItemUpdateRequest,
): Promise<ChecklistItem> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist/item/${itemId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal memperbarui item checklist");
  }
  return response.json();
}

export async function deleteChecklistItem(itemId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist/item/${itemId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus item checklist");
  }
}
