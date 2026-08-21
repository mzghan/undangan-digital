from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.guest import Guest
from app.routers.wedding_trial import _get_session_or_404
from app.schemas.guest import (
    GuestSchema,
    GuestCreateRequest,
    GuestUpdateRequest,
    GuestSummary,
)

router = APIRouter(prefix="/api/trial/guest-premium", tags=["Guest List Premium"])


@router.post("", response_model=GuestSchema)
def add_guest(payload: GuestCreateRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)

    guest = Guest(
        session_id=payload.session_id,
        nama_tamu=payload.nama_tamu,
        kategori=payload.kategori,
        jumlah_orang=payload.jumlah_orang,
        nomor_hp=payload.nomor_hp,
        status_rsvp=payload.status_rsvp,
        catatan=payload.catatan,
    )
    db.add(guest)
    db.commit()
    db.refresh(guest)
    return guest


@router.get("/{session_id}", response_model=List[GuestSchema])
def list_guest(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    return (
        db.query(Guest)
        .filter(Guest.session_id == session_id)
        .order_by(Guest.id)
        .all()
    )


@router.get("/{session_id}/summary", response_model=GuestSummary)
def summary_guest(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    guests = db.query(Guest).filter(Guest.session_id == session_id).all()

    by_status: dict = {}
    by_kategori: dict = {}
    total_orang = 0

    for g in guests:
        by_status[g.status_rsvp] = by_status.get(g.status_rsvp, 0) + 1
        key_kategori = g.kategori or "lain"
        by_kategori[key_kategori] = by_kategori.get(key_kategori, 0) + 1
        total_orang += g.jumlah_orang

    return GuestSummary(
        total_undangan=len(guests),
        total_orang=total_orang,
        by_status=by_status,
        by_kategori=by_kategori,
    )


@router.patch("/item/{guest_id}", response_model=GuestSchema)
def update_guest(guest_id: int, payload: GuestUpdateRequest, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Tamu tidak ditemukan.")

    if payload.nama_tamu is not None:
        guest.nama_tamu = payload.nama_tamu
    if payload.kategori is not None:
        guest.kategori = payload.kategori
    if payload.jumlah_orang is not None:
        guest.jumlah_orang = payload.jumlah_orang
    if payload.nomor_hp is not None:
        guest.nomor_hp = payload.nomor_hp
    if payload.status_rsvp is not None:
        guest.status_rsvp = payload.status_rsvp
    if payload.catatan is not None:
        guest.catatan = payload.catatan

    guest.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(guest)
    return guest


@router.delete("/item/{guest_id}")
def delete_guest(guest_id: int, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Tamu tidak ditemukan.")
    db.delete(guest)
    db.commit()
    return {"message": "Tamu berhasil dihapus."}