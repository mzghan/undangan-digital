export interface SeatingAssignmentDetail {
  id: number;
  guest_id: number;
  guest_nama: string;
  jumlah_kursi: number;
}

export interface SeatingTable {
  id: number;
  session_id: string;
  nama_meja: string;
  kapasitas: number;
  kursi_terpakai: number;
  assignments: SeatingAssignmentDetail[];
}

export interface SeatingTableCreateRequest {
  session_id: string;
  nama_meja: string;
  kapasitas?: number;
}

export interface SeatingTableUpdateRequest {
  nama_meja?: string;
  kapasitas?: number;
}

export interface SeatingAssignRequest {
  session_id: string;
  table_id: number;
  guest_id: number;
  jumlah_kursi?: number;
}

export interface UnassignedGuest {
  guest_id: number;
  nama_tamu: string;
  sisa_kursi: number;
}
