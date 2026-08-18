from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class TrialSession(Base):
    __tablename__ = "trial_sessions"

    session_id = Column(String, primary_key=True, index=True)  
    user_id = Column(String, nullable=True)  
    kota = Column(String, nullable=False)
    jalur = Column(String, nullable=True)  
    budget_total = Column(Integer, nullable=True) 
    konsep_pilihan = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=False) 


class CityPriceIndex(Base):
    __tablename__ = "city_price_index"

    id = Column(Integer, primary_key=True, index=True)
    kota = Column(String, nullable=False, index=True)
    item_name = Column(String, nullable=False)
    kategori = Column(String, nullable=False)  
    prioritas = Column(String, nullable=False) 
    harga_estimasi_min = Column(Integer, nullable=False)
    harga_estimasi_max = Column(Integer, nullable=False)


class ConceptReference(Base):
    __tablename__ = "concept_reference"

    id = Column(Integer, primary_key=True, index=True)
    kota = Column(String, nullable=False, index=True)
    konsep = Column(String, nullable=False) 
    nama_referensi = Column(String, nullable=False)
    estimasi_total_min = Column(Integer, nullable=False)
    estimasi_total_max = Column(Integer, nullable=False)
    deskripsi_singkat = Column(String, nullable=True)