from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)

    nama_tamu = Column(String, nullable=False)
    kategori = Column(String, nullable=True)
    jumlah_orang = Column(Integer, nullable=False, default=1)  
    nomor_hp = Column(String, nullable=True)
    status_rsvp = Column(String, nullable=False, default="belum_diundang")
    catatan = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)