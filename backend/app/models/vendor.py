from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)
    checklist_item_id = Column(
        Integer, ForeignKey("checklist_items_premium.id"), nullable=True
    )

    nama_vendor = Column(String, nullable=False)
    kategori = Column(String, nullable=True)  
    kontak_wa = Column(String, nullable=True)
    status_kontrak = Column(String, nullable=False, default="belum_kontak")
    # belum_kontak | nego | dp | lunas
    nominal_dp = Column(Integer, nullable=True)
    tanggal_dp = Column(DateTime, nullable=True)
    catatan = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)