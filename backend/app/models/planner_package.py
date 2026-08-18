from sqlalchemy import Column, Integer, String, Float
from app.database import Base


class PlannerPackage(Base):
    __tablename__ = "planner_packages"

    id = Column(Integer, primary_key=True, index=True)
    nama_paket = Column(String, nullable=False)
    harga = Column(Float, nullable=False)
    jumlah_sheet = Column(Integer, nullable=True)
    fitur = Column(String, nullable=False)  # disimpan sebagai teks dipisah koma
    deskripsi = Column(String, nullable=True)