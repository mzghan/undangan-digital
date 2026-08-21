export type VendorStatusKontrak = "belum_kontak" | "nego" | "dp" | "lunas";

export interface Vendor {
  id: number;
  session_id: string;
  checklist_item_id: number | null;
  nama_vendor: string;
  kategori: string | null;
  kontak_wa: string | null;
  status_kontrak: VendorStatusKontrak;
  nominal_dp: number | null;
  tanggal_dp: string | null;
  catatan: string | null;
}

export interface VendorCreateRequest {
  session_id: string;
  checklist_item_id?: number | null;
  nama_vendor: string;
  kategori?: string | null;
  kontak_wa?: string | null;
  status_kontrak?: VendorStatusKontrak;
  nominal_dp?: number | null;
  tanggal_dp?: string | null;
  catatan?: string | null;
}

export interface VendorUpdateRequest {
  checklist_item_id?: number | null;
  nama_vendor?: string;
  kategori?: string | null;
  kontak_wa?: string | null;
  status_kontrak?: VendorStatusKontrak;
  nominal_dp?: number | null;
  tanggal_dp?: string | null;
  catatan?: string | null;
}
