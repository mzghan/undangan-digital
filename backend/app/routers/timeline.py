import calendar
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.checklist import ChecklistItem
from app.routers.wedding_trial import _get_session_or_404
from app.schemas.timeline import TimelineSetRequest, TimelineResponse

router = APIRouter(prefix="/api/trial/timeline", tags=["Timeline"])

# Berapa bulan sebelum hari-H tiap kategori item idealnya sudah fix/dibayar
KATEGORI_BULAN_SEBELUM = {
    "venue": 10,
    "catering": 6,
    "dokumentasi": 6,
    "busana": 4,
    "mua": 3,
    "dekorasi": 2,
    "hiburan": 2,
    "lain": 1,
}
DEFAULT_BULAN_SEBELUM = 1  # kategori tak dikenal / item custom tanpa kategori


def _mundur_bulan(tanggal: datetime, bulan: int) -> datetime:
    """Menghitung tanggal mundur N bulan dari suatu tanggal, aman untuk pergantian tahun
    dan tanggal akhir bulan (misal 31 Jan - 1 bulan -> 28/29 Feb)."""
    total_bulan = tanggal.month - 1 - bulan
    tahun = tanggal.year + total_bulan // 12
    bulan_baru = total_bulan % 12 + 1
    hari_terakhir = calendar.monthrange(tahun, bulan_baru)[1]
    hari = min(tanggal.day, hari_terakhir)
    return tanggal.replace(year=tahun, month=bulan_baru, day=hari)


def _parse_tanggal(tanggal_str: str) -> datetime:
    try:
        return datetime.fromisoformat(tanggal_str)
    except ValueError:
        raise HTTPException(
            status_code=422,
            detail="Format tanggal tidak valid, gunakan format YYYY-MM-DD.",
        )


@router.post("/set", response_model=TimelineResponse)
def set_wedding_date(payload: TimelineSetRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, payload.session_id)
    wedding_date = _parse_tanggal(payload.wedding_date)

    session.wedding_date = wedding_date
    db.commit()

    items = (
        db.query(ChecklistItem)
        .filter(ChecklistItem.session_id == payload.session_id)
        .all()
    )

    for item in items:
        bulan = KATEGORI_BULAN_SEBELUM.get(item.kategori or "", DEFAULT_BULAN_SEBELUM)
        item.deadline_date = _mundur_bulan(wedding_date, bulan)

    db.commit()
    for item in items:
        db.refresh(item)

    items_sorted = sorted(items, key=lambda i: i.deadline_date or wedding_date)

    return TimelineResponse(
        session_id=payload.session_id,
        wedding_date=wedding_date,
        items=items_sorted,
    )


@router.get("/{session_id}", response_model=TimelineResponse)
def get_timeline(session_id: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_id)

    items = (
        db.query(ChecklistItem)
        .filter(ChecklistItem.session_id == session_id)
        .all()
    )
    items_sorted = sorted(
        items,
        key=lambda i: i.deadline_date or session.wedding_date or datetime.max,
    )

    return TimelineResponse(
        session_id=session_id,
        wedding_date=session.wedding_date,
        items=items_sorted,
    )