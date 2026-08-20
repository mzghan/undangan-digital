from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class ChecklistItemPremium(Base):
    __tablename__ = "checklist_items_premium"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)

    item_name = Column(String, nullable=False)
    kategori = Column(String, nullable=True)
    prioritas = Column(String, nullable=False, default="penting")  # "wajib" | "penting" | "opsional"
    harga_alokasi = Column(Integer, nullable=False, default=0)

    status = Column(String, nullable=False, default="belum")  # "belum" | "proses" | "selesai"
    catatan = Column(String, nullable=True)

    is_custom = Column(Boolean, nullable=False, default=False)
    source_item_name = Column(String, nullable=True)
    deadline_date = Column(DateTime, nullable=True)
    deadline_recommended = Column(DateTime, nullable=True)
    deadline_is_custom = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    subtasks = relationship(
        "ChecklistSubtask",
        back_populates="checklist_item",
        cascade="all, delete-orphan",
        order_by="ChecklistSubtask.id",
    )


class ChecklistSubtask(Base):
    __tablename__ = "checklist_subtasks"

    id = Column(Integer, primary_key=True, index=True)
    checklist_item_id = Column(
        Integer, ForeignKey("checklist_items_premium.id"), nullable=False, index=True
    )
    nama = Column(String, nullable=False)
    is_done = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    checklist_item = relationship("ChecklistItemPremium", back_populates="subtasks")