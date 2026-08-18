from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from app.database import Base


class ChecklistItem(Base):
    __tablename__ = "checklist_items"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False, index=True)

    item_name = Column(String, nullable=False)
    kategori = Column(String, nullable=True)
    harga_alokasi = Column(Integer, nullable=False, default=0)

    is_done = Column(Boolean, nullable=False, default=False)
    is_custom = Column(Boolean, nullable=False, default=False)
    source_item_name = Column(String, nullable=True)
    deadline_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)