export type Paket = "basic" | "premium" | "vendor_tracker";

export interface TrialStartResponse {
  session_id: string;
  paket: Paket;
  expires_at: string;
}

export interface Step1Response {
  session_id: string;
  kota: string;
  paket: Paket;
  kota_tersedia: boolean;
}

export interface PriceItem {
  item_name: string;
  kategori: string;
  prioritas: "wajib" | "penting" | "opsional";
  harga_estimasi_min: number;
  harga_estimasi_max: number;
  harga_alokasi: number;
  bisa_diskip: boolean;
}

export interface Step2BudgetResponse {
  session_id: string;
  budget_total: number;
  rata_rata_kota_min: number;
  rata_rata_kota_max: number;
  status_budget: "terbatas" | "normal" | "leluasa";
  items_wajib: PriceItem[];
  items_penting: PriceItem[];
  items_opsional: PriceItem[];
}

export interface BudgetTier {
  label: "Basic" | "Ideal" | "Premium";
  budget_total: number;
  status_budget: "terbatas" | "normal" | "leluasa";
  items_wajib: PriceItem[];
  items_penting: PriceItem[];
  items_opsional: PriceItem[];
}

export interface Step2KonsepResponse {
  session_id: string;
  konsep: string;
  nama_referensi: string;
  deskripsi_singkat: string | null;
  tiers: BudgetTier[];
}

export interface TrialSession {
  session_id: string;
  paket: Paket;
  kota: string;
  jalur: "budget" | "konsep";
  budget_total: number | null;
  konsep_pilihan: string | null;
  created_at: string;
  expires_at: string;
}
