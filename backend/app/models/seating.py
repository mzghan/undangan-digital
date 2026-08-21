from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class SeatingTable(Base):
    __tablename__ = "seating_tables"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)

    nama_meja = Column(String, nullable=False)
    kapasitas = Column(Integer, nullable=False, default=8)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    assignments = relationship(
        "SeatingAssignment",
        back_populates="table",
        cascade="all, delete-orphan",
        order_by="SeatingAssignment.id",
    )


class SeatingAssignment(Base):
    __tablename__ = "seating_assignments"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)
    table_id = Column(Integer, ForeignKey("seating_tables.id"), nullable=False)
    guest_id = Column(Integer, ForeignKey("guests.id"), nullable=False)
    jumlah_kursi = Column(Integer, nullable=False, default=1)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    table = relationship("SeatingTable", back_populates="assignments")