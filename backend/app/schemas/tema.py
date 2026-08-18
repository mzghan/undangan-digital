from pydantic import BaseModel
from typing import Optional

class TemaBase(BaseModel):
    nama: str
    kategori: str
    harga: float
    gambar_url: Optional[str] = None
    deksripsi: Optional[str] = None

class TemaCreate(TemaBase):
    pass

class Tema(TemaBase):
    id: int

    class Config:
        from_attributes = True