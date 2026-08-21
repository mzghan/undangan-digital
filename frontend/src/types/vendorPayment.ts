export type PaymentStatusBayar = "belum_bayar" | "lunas";

export interface VendorPayment {
  id: number;
  session_id: string;
  vendor_id: number;
  vendor_nama: string;
  judul: string;
  nominal: number;
  tanggal_jatuh_tempo: string | null;
  status_bayar: PaymentStatusBayar;
  tanggal_dibayar: string | null;
  catatan: string | null;
}

export interface VendorPaymentCreateRequest {
  session_id: string;
  vendor_id: number;
  judul: string;
  nominal: number;
  tanggal_jatuh_tempo?: string | null;
  catatan?: string | null;
}

export interface VendorPaymentUpdateRequest {
  judul?: string;
  nominal?: number;
  tanggal_jatuh_tempo?: string | null;
  status_bayar?: PaymentStatusBayar;
  tanggal_dibayar?: string | null;
  catatan?: string | null;
}

export interface VendorPaymentSummary {
  total_terjadwal: number;
  total_lunas: number;
  total_belum_lunas: number;
  jumlah_termin_lunas: number;
  jumlah_termin_belum_lunas: number;
}
