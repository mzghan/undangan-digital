from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

VendorStatusKontrak = Literal["belum_kontak", "nego", "dp", "lunas"]


class VendorSchema(BaseModel):
    id: int
    session_id: str
    checklist_item_id: Optional[int]
    nama_vendor: str
    kategori: Optional[str]
    kontak_wa: Optional[str]
    status_kontrak: VendorStatusKontrak
    nominal_dp: Optional[int]
    tanggal_dp: Optional[datetime]
    catatan: Optional[str]

    class Config:
        from_attributes = True


class VendorCreateRequest(BaseModel):
    session_id: str
    checklist_item_id: Optional[int] = None
    nama_vendor: str
    kategori: Optional[str] = None
    kontak_wa: Optional[str] = None
    status_kontrak: VendorStatusKontrak = "belum_kontak"
    nominal_dp: Optional[int] = None
    tanggal_dp: Optional[str] = None  
    catatan: Optional[str] = None


class VendorUpdateRequest(BaseModel):
    checklist_item_id: Optional[int] = None
    nama_vendor: Optional[str] = None
    kategori: Optional[str] = None
    kontak_wa: Optional[str] = None
    status_kontrak: Optional[VendorStatusKontrak] = None
    nominal_dp: Optional[int] = None
    tanggal_dp: Optional[str] = None
    catatan: Optional[str] = None