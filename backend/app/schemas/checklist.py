from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ChecklistItemSchema(BaseModel):
    id: int
    session_id: str
    item_name: str
    kategori: Optional[str]
    harga_alokasi: int
    is_done: bool
    is_custom: bool
    source_item_name: Optional[str]
    deadline_date: Optional[datetime]

    class Config:
        from_attributes = True


class ChecklistGenerateRequest(BaseModel):
    session_id: str
    budget_total: int


class ChecklistItemCreateRequest(BaseModel):
    session_id: str
    item_name: str
    kategori: Optional[str] = None
    harga_alokasi: int = 0


class ChecklistItemUpdateRequest(BaseModel):
    item_name: Optional[str] = None
    kategori: Optional[str] = None
    harga_alokasi: Optional[int] = None
    is_done: Optional[bool] = None
    deadline_date: Optional[str] = None