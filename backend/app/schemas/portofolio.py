from pydantic import BaseModel
from typing import Optional


class PortofolioBase(BaseModel):
    judul: str
    kategori: str
    gambar_url: Optional[str] = None
    deskripsi: Optional[str] = None
    nama_klien: Optional[str] = None


class PortofolioCreate(PortofolioBase):
    pass


class Portofolio(PortofolioBase):
    id: int

    class Config:
        from_attributes = True