from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class VendorPayment(Base):
    __tablename__ = "vendor_payments"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id"), nullable=False)

    judul = Column(String, nullable=False)  
    nominal = Column(Integer, nullable=False)
    tanggal_jatuh_tempo = Column(DateTime, nullable=True)
    status_bayar = Column(String, nullable=False, default="belum_bayar") 
    tanggal_dibayar = Column(DateTime, nullable=True)
    catatan = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    vendor = relationship("Vendor", back_populates="payments")