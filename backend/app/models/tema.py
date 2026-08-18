from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Tema(Base):
    __tablename__ = "temas"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    kategori = Column(String, nullable=False)
    harga = Column(Float, nullable=False)
    gambar_url = Column(String, nullable=True)
    deskripsi = Column(String, nullable=True)