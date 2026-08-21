from pydantic import BaseModel
from typing import Optional, List, Literal, Dict

GuestKategori = Literal["keluarga_pria", "keluarga_wanita", "teman", "kolega", "lain"]
GuestStatusRsvp = Literal[
    "belum_diundang", "diundang", "menunggu_konfirmasi", "hadir", "tidak_hadir"
]


class GuestSchema(BaseModel):
    id: int
    session_id: str
    nama_tamu: str
    kategori: Optional[GuestKategori]
    jumlah_orang: int
    nomor_hp: Optional[str]
    status_rsvp: GuestStatusRsvp
    catatan: Optional[str]

    class Config:
        from_attributes = True


class GuestCreateRequest(BaseModel):
    session_id: str
    nama_tamu: str
    kategori: Optional[GuestKategori] = None
    jumlah_orang: int = 1
    nomor_hp: Optional[str] = None
    status_rsvp: GuestStatusRsvp = "belum_diundang"
    catatan: Optional[str] = None


class GuestUpdateRequest(BaseModel):
    nama_tamu: Optional[str] = None
    kategori: Optional[GuestKategori] = None
    jumlah_orang: Optional[int] = None
    nomor_hp: Optional[str] = None
    status_rsvp: Optional[GuestStatusRsvp] = None
    catatan: Optional[str] = None


class GuestSummary(BaseModel):
    total_undangan: int  
    total_orang: int  
    by_status: Dict[str, int]
    by_kategori: Dict[str, int]