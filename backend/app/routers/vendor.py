from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.vendor import Vendor
from app.models.checklistPremium import ChecklistItemPremium
from app.routers.wedding_trial import _get_session_or_404
from app.schemas.vendor import VendorSchema, VendorCreateRequest, VendorUpdateRequest

router = APIRouter(prefix="/api/trial/vendor-premium", tags=["Vendor Premium"])


def _validate_checklist_item(db: Session, session_id: str, checklist_item_id: Optional[int]):
    if checklist_item_id is None:
        return
    item = (
        db.query(ChecklistItemPremium)
        .filter(
            ChecklistItemPremium.id == checklist_item_id,
            ChecklistItemPremium.session_id == session_id,
        )
        .first()
    )
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item checklist yang mau dihubungkan tidak ditemukan di sesi ini.",
        )


@router.post("", response_model=VendorSchema)
def add_vendor(payload: VendorCreateRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)
    _validate_checklist_item(db, payload.session_id, payload.checklist_item_id)

    vendor = Vendor(
        session_id=payload.session_id,
        checklist_item_id=payload.checklist_item_id,
        nama_vendor=payload.nama_vendor,
        kategori=payload.kategori,
        kontak_wa=payload.kontak_wa,
        status_kontrak=payload.status_kontrak,
        nominal_dp=payload.nominal_dp,
        tanggal_dp=datetime.fromisoformat(payload.tanggal_dp) if payload.tanggal_dp else None,
        catatan=payload.catatan,
    )
    db.add(vendor)
    db.commit()
    db.refresh(vendor)
    return vendor


@router.get("/{session_id}", response_model=List[VendorSchema])
def list_vendor(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    return (
        db.query(Vendor)
        .filter(Vendor.session_id == session_id)
        .order_by(Vendor.id)
        .all()
    )


@router.patch("/item/{vendor_id}", response_model=VendorSchema)
def update_vendor(vendor_id: int, payload: VendorUpdateRequest, db: Session = Depends(get_db)):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor tidak ditemukan.")

    if payload.checklist_item_id is not None:
        _validate_checklist_item(db, vendor.session_id, payload.checklist_item_id)
        vendor.checklist_item_id = payload.checklist_item_id
    if payload.nama_vendor is not None:
        vendor.nama_vendor = payload.nama_vendor
    if payload.kategori is not None:
        vendor.kategori = payload.kategori
    if payload.kontak_wa is not None:
        vendor.kontak_wa = payload.kontak_wa
    if payload.status_kontrak is not None:
        vendor.status_kontrak = payload.status_kontrak
    if payload.nominal_dp is not None:
        vendor.nominal_dp = payload.nominal_dp
    if payload.tanggal_dp is not None:
        vendor.tanggal_dp = datetime.fromisoformat(payload.tanggal_dp)
    if payload.catatan is not None:
        vendor.catatan = payload.catatan

    vendor.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(vendor)
    return vendor


@router.delete("/item/{vendor_id}")
def delete_vendor(vendor_id: int, db: Session = Depends(get_db)):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor tidak ditemukan.")
    db.delete(vendor)
    db.commit()
    return {"message": "Vendor berhasil dihapus."}