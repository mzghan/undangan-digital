from pydantic import BaseModel, Field
from typing import Optional


class TestimoniBase(BaseModel):
    nama: str
    rating: int = Field(..., ge=1, le=5)
    isi: str
    foto_url: Optional[str] = None


class TestimoniCreate(TestimoniBase):
    pass


class Testimoni(TestimoniBase):
    id: int

    class Config:
        from_attributes = True