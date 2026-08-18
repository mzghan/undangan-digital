from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.checklist import ChecklistItem
from app.models.wedding_trial import CityPriceIndex
from app.routers.wedding_trial import _get_session_or_404, _hitung_breakdown
from app.schemas.checklist import (
    ChecklistItemSchema,
    ChecklistItemCreateRequest,
    ChecklistItemUpdateRequest,
    ChecklistGenerateRequest,
)

router = APIRouter(prefix="/api/trial/checklist", tags=["Checklist"])


@router.post("/generate", response_model=List[ChecklistItemSchema])
def generate_checklist(payload: ChecklistGenerateRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, payload.session_id)

    items = db.query(CityPriceIndex).filter(CityPriceIndex.kota == session.kota).all()
    if not items:
        raise HTTPException(status_code=404, detail=f"Data harga untuk kota {session.kota} belum tersedia.")

    _, _, _, items_wajib, items_penting, _ = _hitung_breakdown(items, payload.budget_total)

    # Hapus item hasil generate sebelumnya (bukan item custom), supaya generate ulang tidak dobel
    db.query(ChecklistItem).filter(
        ChecklistItem.session_id == payload.session_id,
        ChecklistItem.is_custom == False,
    ).delete()

    new_items = []
    for item in items_wajib + items_penting:
        checklist_item = ChecklistItem(
            session_id=payload.session_id,
            item_name=item.item_name,
            kategori=item.kategori,
            harga_alokasi=item.harga_alokasi,
            is_done=False,
            is_custom=False,
            source_item_name=item.item_name,
        )
        db.add(checklist_item)
        new_items.append(checklist_item)

    db.commit()
    for item in new_items:
        db.refresh(item)

    return new_items


@router.get("/{session_id}", response_model=List[ChecklistItemSchema])
def list_checklist(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    return (
        db.query(ChecklistItem)
        .filter(ChecklistItem.session_id == session_id)
        .order_by(ChecklistItem.id)
        .all()
    )


@router.post("/item", response_model=ChecklistItemSchema)
def add_checklist_item(payload: ChecklistItemCreateRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)

    item = ChecklistItem(
        session_id=payload.session_id,
        item_name=payload.item_name,
        kategori=payload.kategori,
        harga_alokasi=payload.harga_alokasi,
        is_done=False,
        is_custom=True,
        source_item_name=None,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/item/{item_id}", response_model=ChecklistItemSchema)
def update_checklist_item(
    item_id: int, payload: ChecklistItemUpdateRequest, db: Session = Depends(get_db)
):
    item = db.query(ChecklistItem).filter(ChecklistItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item checklist tidak ditemukan.")

    if payload.item_name is not None:
        item.item_name = payload.item_name
    if payload.kategori is not None:
        item.kategori = payload.kategori
    if payload.harga_alokasi is not None:
        item.harga_alokasi = payload.harga_alokasi
    if payload.is_done is not None:
        item.is_done = payload.is_done

    item.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(item)
    return item


@router.delete("/item/{item_id}")
def delete_checklist_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ChecklistItem).filter(ChecklistItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item checklist tidak ditemukan.")
    db.delete(item)
    db.commit()
    return {"message": "Item checklist berhasil dihapus."}