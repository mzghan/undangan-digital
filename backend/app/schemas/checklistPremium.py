from pydantic import BaseModel
from typing import Optional, List, Literal
from datetime import datetime


ChecklistPrioritas = Literal["wajib", "penting", "opsional"]
ChecklistStatus = Literal["belum", "proses", "selesai"]


class ChecklistSubtaskSchema(BaseModel):
    id: int
    checklist_item_id: int
    nama: str
    is_done: bool

    class Config:
        from_attributes = True


class ChecklistItemPremiumSchema(BaseModel):
    id: int
    session_id: str
    item_name: str
    kategori: Optional[str]
    prioritas: ChecklistPrioritas
    harga_alokasi: int
    status: ChecklistStatus
    catatan: Optional[str]
    is_custom: bool
    source_item_name: Optional[str]
    deadline_date: Optional[datetime]
    deadline_recommended: Optional[datetime]
    deadline_is_custom: bool
    subtasks: List[ChecklistSubtaskSchema] = []

    class Config:
        from_attributes = True


class ChecklistPremiumGenerateRequest(BaseModel):
    session_id: str
    budget_total: int


class ChecklistPremiumItemCreateRequest(BaseModel):
    session_id: str
    item_name: str
    kategori: Optional[str] = None
    prioritas: ChecklistPrioritas = "penting"
    harga_alokasi: int = 0


class ChecklistPremiumItemUpdateRequest(BaseModel):
    item_name: Optional[str] = None
    kategori: Optional[str] = None
    prioritas: Optional[ChecklistPrioritas] = None
    harga_alokasi: Optional[int] = None
    status: Optional[ChecklistStatus] = None
    catatan: Optional[str] = None
    deadline_date: Optional[str] = None


class ChecklistSubtaskCreateRequest(BaseModel):
    checklist_item_id: int
    nama: str


class ChecklistSubtaskUpdateRequest(BaseModel):
    nama: Optional[str] = None
    is_done: Optional[bool] = None