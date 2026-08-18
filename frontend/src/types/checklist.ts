export interface ChecklistItem {
  id: number;
  session_id: string;
  item_name: string;
  kategori: string | null;
  harga_alokasi: number;
  is_done: boolean;
  is_custom: boolean;
  source_item_name: string | null;
}

export interface ChecklistGenerateRequest {
  session_id: string;
  budget_total: number;
}

export interface ChecklistItemCreateRequest {
  session_id: string;
  item_name: string;
  kategori?: string;
  harga_alokasi?: number;
}

export interface ChecklistItemUpdateRequest {
  item_name?: string;
  kategori?: string;
  harga_alokasi?: number;
  is_done?: boolean;
}
