from pydantic import BaseModel
from typing import Optional


class PlannerPackageBase(BaseModel):
    nama_paket: str
    harga: float
    jumlah_sheet: Optional[int] = None
    fitur: str
    deskripsi: Optional[str] = None


class PlannerPackageCreate(PlannerPackageBase):
    pass


class PlannerPackage(PlannerPackageBase):
    id: int

    class Config:
        from_attributes = True