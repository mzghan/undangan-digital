from sqlalchemy import Column, Integer, String
from app.database import Base


class Portofolio(Base):
    __tablename__ = "portofolios"

    id = Column(Integer, primary_key=True, index=True)
    judul = Column(String, nullable=False)
    kategori = Column(String, nullable=False)  
    gambar_url = Column(String, nullable=True)
    deskripsi = Column(String, nullable=True)
    nama_klien = Column(String, nullable=True)