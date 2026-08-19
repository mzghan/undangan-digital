from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.checklistPremium import ChecklistItemPremium, ChecklistSubtask
from app.models.wedding_trial import CityPriceIndex
from app.routers.wedding_trial import _get_session_or_404, _hitung_breakdown
from app.schemas.checklistPremium import (
    ChecklistItemPremiumSchema,
    ChecklistSubtaskSchema,
    ChecklistPremiumGenerateRequest,
    ChecklistPremiumItemCreateRequest,
    ChecklistPremiumItemUpdateRequest,
    ChecklistSubtaskCreateRequest,
    ChecklistSubtaskUpdateRequest,
)

router = APIRouter(prefix="/api/trial/checklist-premium", tags=["Checklist Premium"])


@router.post("/generate", response_model=List[ChecklistItemPremiumSchema])
def generate_checklist_premium(
    payload: ChecklistPremiumGenerateRequest, db: Session = Depends(get_db)
):
    session = _get_session_or_404(db, payload.session_id)

    items = db.query(CityPriceIndex).filter(CityPriceIndex.kota == session.kota).all()
    if not items:
        raise HTTPException(status_code=404, detail=f"Data harga untuk kota {session.kota} belum tersedia.")

    _, _, _, items_wajib, items_penting, items_opsional = _hitung_breakdown(
        items, payload.budget_total
    )

    old_items = (
        db.query(ChecklistItemPremium)
        .filter(
            ChecklistItemPremium.session_id == payload.session_id,
            ChecklistItemPremium.is_custom == False,
        )
        .all()
    )
    for old_item in old_items:
        db.delete(old_item)
    db.commit()

    new_items = []
    for item in items_wajib + items_penting + items_opsional:
        checklist_item = ChecklistItemPremium(
            session_id=payload.session_id,
            item_name=item.item_name,
            kategori=item.kategori,
            prioritas=item.prioritas,
            harga_alokasi=item.harga_alokasi,
            status="belum",
            catatan=None,
            is_custom=False,
            source_item_name=item.item_name,
        )
        db.add(checklist_item)
        new_items.append(checklist_item)

    db.commit()
    for item in new_items:
        db.refresh(item)

    return new_items


@router.get("/{session_id}", response_model=List[ChecklistItemPremiumSchema])
def list_checklist_premium(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    return (
        db.query(ChecklistItemPremium)
        .filter(ChecklistItemPremium.session_id == session_id)
        .order_by(ChecklistItemPremium.id)
        .all()
    )


@router.post("/item", response_model=ChecklistItemPremiumSchema)
def add_checklist_item_premium(
    payload: ChecklistPremiumItemCreateRequest, db: Session = Depends(get_db)
):
    _get_session_or_404(db, payload.session_id)

    item = ChecklistItemPremium(
        session_id=payload.session_id,
        item_name=payload.item_name,
        kategori=payload.kategori,
        prioritas=payload.prioritas,
        harga_alokasi=payload.harga_alokasi,
        status="belum",
        catatan=None,
        is_custom=True,
        source_item_name=None,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/item/{item_id}", response_model=ChecklistItemPremiumSchema)
def update_checklist_item_premium(
    item_id: int, payload: ChecklistPremiumItemUpdateRequest, db: Session = Depends(get_db)
):
    item = db.query(ChecklistItemPremium).filter(ChecklistItemPremium.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item checklist tidak ditemukan.")

    if payload.item_name is not None:
        item.item_name = payload.item_name
    if payload.kategori is not None:
        item.kategori = payload.kategori
    if payload.prioritas is not None:
        item.prioritas = payload.prioritas
    if payload.harga_alokasi is not None:
        item.harga_alokasi = payload.harga_alokasi
    if payload.status is not None:
        item.status = payload.status
    if payload.catatan is not None:
        item.catatan = payload.catatan
    if payload.deadline_date is not None:
        item.deadline_date = datetime.fromisoformat(payload.deadline_date)

    item.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(item)
    return item


@router.delete("/item/{item_id}")
def delete_checklist_item_premium(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ChecklistItemPremium).filter(ChecklistItemPremium.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item checklist tidak ditemukan.")
    db.delete(item)  # cascade otomatis hapus subtask-nya juga
    db.commit()
    return {"message": "Item checklist berhasil dihapus."}


@router.post("/subtask", response_model=ChecklistSubtaskSchema)
def add_subtask(payload: ChecklistSubtaskCreateRequest, db: Session = Depends(get_db)):
    parent = (
        db.query(ChecklistItemPremium)
        .filter(ChecklistItemPremium.id == payload.checklist_item_id)
        .first()
    )
    if not parent:
        raise HTTPException(status_code=404, detail="Item checklist induk tidak ditemukan.")

    subtask = ChecklistSubtask(
        checklist_item_id=payload.checklist_item_id,
        nama=payload.nama,
        is_done=False,
    )
    db.add(subtask)
    db.commit()
    db.refresh(subtask)
    return subtask


@router.patch("/subtask/{subtask_id}", response_model=ChecklistSubtaskSchema)
def update_subtask(
    subtask_id: int, payload: ChecklistSubtaskUpdateRequest, db: Session = Depends(get_db)
):
    subtask = db.query(ChecklistSubtask).filter(ChecklistSubtask.id == subtask_id).first()
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask tidak ditemukan.")

    if payload.nama is not None:
        subtask.nama = payload.nama
    if payload.is_done is not None:
        subtask.is_done = payload.is_done

    db.commit()
    db.refresh(subtask)
    return subtask


@router.delete("/subtask/{subtask_id}")
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = db.query(ChecklistSubtask).filter(ChecklistSubtask.id == subtask_id).first()
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask tidak ditemukan.")
    db.delete(subtask)
    db.commit()
    return {"message": "Subtask berhasil dihapus."}