from pydantic import BaseModel
from typing import Optional, List, Literal
from datetime import datetime

PaymentStatusBayar = Literal["belum_bayar", "lunas"]


class VendorPaymentSchema(BaseModel):
    id: int
    session_id: str
    vendor_id: int
    vendor_nama: str
    judul: str
    nominal: int
    tanggal_jatuh_tempo: Optional[datetime]
    status_bayar: PaymentStatusBayar
    tanggal_dibayar: Optional[datetime]
    catatan: Optional[str]

    class Config:
        from_attributes = True


class VendorPaymentCreateRequest(BaseModel):
    session_id: str
    vendor_id: int
    judul: str
    nominal: int
    tanggal_jatuh_tempo: Optional[str] = None
    catatan: Optional[str] = None


class VendorPaymentUpdateRequest(BaseModel):
    judul: Optional[str] = None
    nominal: Optional[int] = None
    tanggal_jatuh_tempo: Optional[str] = None
    status_bayar: Optional[PaymentStatusBayar] = None
    tanggal_dibayar: Optional[str] = None
    catatan: Optional[str] = None


class VendorPaymentSummary(BaseModel):
    total_terjadwal: int 
    total_lunas: int
    total_belum_lunas: int
    jumlah_termin_lunas: int
    jumlah_termin_belum_lunas: int