from pydantic import BaseModel
from typing import Optional, List


class SeatingAssignmentDetailSchema(BaseModel):
    id: int
    guest_id: int
    guest_nama: str
    jumlah_kursi: int

    class Config:
        from_attributes = True


class SeatingTableSchema(BaseModel):
    id: int
    session_id: str
    nama_meja: str
    kapasitas: int
    kursi_terpakai: int
    assignments: List[SeatingAssignmentDetailSchema] = []

    class Config:
        from_attributes = True


class SeatingTableCreateRequest(BaseModel):
    session_id: str
    nama_meja: str
    kapasitas: int = 8


class SeatingTableUpdateRequest(BaseModel):
    nama_meja: Optional[str] = None
    kapasitas: Optional[int] = None


class SeatingAssignRequest(BaseModel):
    session_id: str
    table_id: int
    guest_id: int
    jumlah_kursi: Optional[int] = None 


class UnassignedGuestSchema(BaseModel):
    guest_id: int
    nama_tamu: str
    sisa_kursi: int