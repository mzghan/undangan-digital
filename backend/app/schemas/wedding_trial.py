from pydantic import BaseModel
from typing import List, Optional


class TrialStartRequest(BaseModel):
    paket: str = "basic"


class TrialStartResponse(BaseModel):
    session_id: str
    paket: str
    expires_at: str


class Step1Request(BaseModel):
    session_id: str
    kota: str
    paket: str = "basic"


class Step1Response(BaseModel):
    session_id: str
    kota: str
    paket: str
    kota_tersedia: bool


class Step2BudgetRequest(BaseModel):
    session_id: str
    budget_total: int


class PriceItemSchema(BaseModel):
    item_name: str
    kategori: str
    prioritas: str
    harga_estimasi_min: int
    harga_estimasi_max: int
    harga_alokasi: int
    bisa_diskip: bool

    class Config:
        from_attributes = True


class Step2BudgetResponse(BaseModel):
    session_id: str
    budget_total: int
    rata_rata_kota_min: int
    rata_rata_kota_max: int
    status_budget: str
    items_wajib: List[PriceItemSchema]
    items_penting: List[PriceItemSchema]
    items_opsional: List[PriceItemSchema]


class Step2KonsepRequest(BaseModel):
    session_id: str
    konsep: str


class BudgetTierSchema(BaseModel):
    label: str
    budget_total: int
    status_budget: str
    items_wajib: List[PriceItemSchema]
    items_penting: List[PriceItemSchema]
    items_opsional: List[PriceItemSchema]


class Step2KonsepResponse(BaseModel):
    session_id: str
    konsep: str
    nama_referensi: str
    deskripsi_singkat: Optional[str]
    tiers: List[BudgetTierSchema]


class TrialSessionResponse(BaseModel):
    session_id: str
    paket: str
    kota: str
    jalur: Optional[str]
    budget_total: Optional[int]
    konsep_pilihan: Optional[str]
    created_at: str
    expires_at: str

    class Config:
        from_attributes = True