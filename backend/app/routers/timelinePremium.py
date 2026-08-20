from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.checklistPremium import ChecklistItemPremium
from app.routers.wedding_trial import _get_session_or_404
from app.routers.timeline import (
    KATEGORI_BULAN_SEBELUM,
    DEFAULT_BULAN_SEBELUM,
    _mundur_bulan,
    _parse_tanggal,
)
from app.schemas.checklistPremium import ChecklistItemPremiumSchema
from app.schemas.timelinePremium import TimelinePremiumSetRequest, TimelinePremiumResponse

router = APIRouter(prefix="/api/trial/timeline-premium", tags=["Timeline Premium"])

PRIORITAS_PERCEPATAN_BULAN = {
    "wajib": 1,
    "penting": 0,
    "opsional": -1,
}


def _hitung_deadline_premium(wedding_date: datetime, item: ChecklistItemPremium) -> datetime:
    bulan_dasar = KATEGORI_BULAN_SEBELUM.get(item.kategori or "", DEFAULT_BULAN_SEBELUM)
    percepatan = PRIORITAS_PERCEPATAN_BULAN.get(item.prioritas, 0)
    bulan = max(bulan_dasar + percepatan, 0)
    return _mundur_bulan(wedding_date, bulan)


@router.post("/set", response_model=TimelinePremiumResponse)
def set_wedding_date_premium(payload: TimelinePremiumSetRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, payload.session_id)
    wedding_date = _parse_tanggal(payload.wedding_date)

    session.wedding_date = wedding_date
    db.commit()

    items = (
        db.query(ChecklistItemPremium)
        .filter(ChecklistItemPremium.session_id == payload.session_id)
        .all()
    )

    for item in items:
        rekomendasi = _hitung_deadline_premium(wedding_date, item)
        item.deadline_recommended = rekomendasi
        if not item.deadline_is_custom:
            item.deadline_date = rekomendasi

    db.commit()
    for item in items:
        db.refresh(item)

    items_sorted = sorted(items, key=lambda i: i.deadline_date or wedding_date)

    return TimelinePremiumResponse(
        session_id=payload.session_id,
        wedding_date=wedding_date,
        items=items_sorted,
    )


@router.get("/{session_id}", response_model=TimelinePremiumResponse)
def get_timeline_premium(session_id: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_id)

    items = (
        db.query(ChecklistItemPremium)
        .filter(ChecklistItemPremium.session_id == session_id)
        .all()
    )
    items_sorted = sorted(
        items,
        key=lambda i: i.deadline_date or session.wedding_date or datetime.max,
    )

    return TimelinePremiumResponse(
        session_id=session_id,
        wedding_date=session.wedding_date,
        items=items_sorted,
    )


@router.patch("/item/{item_id}/reset", response_model=ChecklistItemPremiumSchema)
def reset_deadline_to_recommended(item_id: int, db: Session = Depends(get_db)):
    """Kembalikan deadline item ke rekomendasi sistem, batalkan status custom-nya."""
    item = db.query(ChecklistItemPremium).filter(ChecklistItemPremium.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item checklist tidak ditemukan.")

    item.deadline_date = item.deadline_recommended
    item.deadline_is_custom = False
    item.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(item)
    return item