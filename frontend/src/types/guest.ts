export type GuestKategori =
  | "keluarga_pria"
  | "keluarga_wanita"
  | "teman"
  | "kolega"
  | "lain";

export type GuestStatusRsvp =
  | "belum_diundang"
  | "diundang"
  | "menunggu_konfirmasi"
  | "hadir"
  | "tidak_hadir";

export interface Guest {
  id: number;
  session_id: string;
  nama_tamu: string;
  kategori: GuestKategori | null;
  jumlah_orang: number;
  nomor_hp: string | null;
  status_rsvp: GuestStatusRsvp;
  catatan: string | null;
}

export interface GuestCreateRequest {
  session_id: string;
  nama_tamu: string;
  kategori?: GuestKategori | null;
  jumlah_orang?: number;
  nomor_hp?: string | null;
  status_rsvp?: GuestStatusRsvp;
  catatan?: string | null;
}

export interface GuestUpdateRequest {
  nama_tamu?: string;
  kategori?: GuestKategori | null;
  jumlah_orang?: number;
  nomor_hp?: string | null;
  status_rsvp?: GuestStatusRsvp;
  catatan?: string | null;
}

export interface GuestSummary {
  total_undangan: number;
  total_orang: number;
  by_status: Record<string, number>;
  by_kategori: Record<string, number>;
}
