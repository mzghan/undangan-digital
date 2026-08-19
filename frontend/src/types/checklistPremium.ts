export type ChecklistStatus = "belum" | "proses" | "selesai";
export type ChecklistPrioritas = "wajib" | "penting" | "opsional";

export interface ChecklistSubtask {
  id: number;
  checklist_item_id: number;
  nama: string;
  is_done: boolean;
}

export interface ChecklistItemPremium {
  id: number;
  session_id: string;
  item_name: string;
  kategori: string | null;
  prioritas: ChecklistPrioritas;
  harga_alokasi: number;
  status: ChecklistStatus;
  catatan: string | null;
  is_custom: boolean;
  source_item_name: string | null;
  deadline_date: string | null;
  subtasks: ChecklistSubtask[];
}

export interface ChecklistPremiumGenerateRequest {
  session_id: string;
  budget_total: number;
}

export interface ChecklistPremiumItemCreateRequest {
  session_id: string;
  item_name: string;
  kategori?: string;
  prioritas?: ChecklistPrioritas;
  harga_alokasi?: number;
}

export interface ChecklistPremiumItemUpdateRequest {
  item_name?: string;
  kategori?: string;
  prioritas?: ChecklistPrioritas;
  harga_alokasi?: number;
  status?: ChecklistStatus;
  catatan?: string;
  deadline_date?: string;
}

export interface ChecklistSubtaskCreateRequest {
  checklist_item_id: number;
  nama: string;
}

export interface ChecklistSubtaskUpdateRequest {
  nama?: string;
  is_done?: boolean;
}
