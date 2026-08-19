import type {
  ChecklistItemPremium,
  ChecklistSubtask,
  ChecklistPremiumGenerateRequest,
  ChecklistPremiumItemCreateRequest,
  ChecklistPremiumItemUpdateRequest,
  ChecklistSubtaskCreateRequest,
  ChecklistSubtaskUpdateRequest,
} from "../types/checklistPremium";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateChecklistPremium(
  payload: ChecklistPremiumGenerateRequest,
): Promise<ChecklistItemPremium[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal membuat checklist");
  }
  return response.json();
}

export async function getChecklistPremium(
  sessionId: string,
): Promise<ChecklistItemPremium[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil checklist");
  }
  return response.json();
}

export async function addChecklistItemPremium(
  payload: ChecklistPremiumItemCreateRequest,
): Promise<ChecklistItemPremium> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/item`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menambah item checklist");
  }
  return response.json();
}

export async function updateChecklistItemPremium(
  itemId: number,
  payload: ChecklistPremiumItemUpdateRequest,
): Promise<ChecklistItemPremium> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/item/${itemId}`,
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

export async function deleteChecklistItemPremium(
  itemId: number,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/item/${itemId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus item checklist");
  }
}

export async function addSubtask(
  payload: ChecklistSubtaskCreateRequest,
): Promise<ChecklistSubtask> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/subtask`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menambah subtask");
  }
  return response.json();
}

export async function updateSubtask(
  subtaskId: number,
  payload: ChecklistSubtaskUpdateRequest,
): Promise<ChecklistSubtask> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/subtask/${subtaskId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal memperbarui subtask");
  }
  return response.json();
}

export async function deleteSubtask(subtaskId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/checklist-premium/subtask/${subtaskId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus subtask");
  }
}
