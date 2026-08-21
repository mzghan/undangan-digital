from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.seating import SeatingTable, SeatingAssignment
from app.models.guest import Guest
from app.routers.wedding_trial import _get_session_or_404
from app.schemas.seating import (
    SeatingTableSchema,
    SeatingTableCreateRequest,
    SeatingTableUpdateRequest,
    SeatingAssignRequest,
    SeatingAssignmentDetailSchema,
    UnassignedGuestSchema,
)

router = APIRouter(prefix="/api/trial/seating-premium", tags=["Seating Chart Premium"])


def _serialize_table(db: Session, table: SeatingTable) -> SeatingTableSchema:
    assignments = []
    kursi_terpakai = 0
    for a in table.assignments:
        guest = db.query(Guest).filter(Guest.id == a.guest_id).first()
        assignments.append(
            SeatingAssignmentDetailSchema(
                id=a.id,
                guest_id=a.guest_id,
                guest_nama=guest.nama_tamu if guest else "(tamu dihapus)",
                jumlah_kursi=a.jumlah_kursi,
            )
        )
        kursi_terpakai += a.jumlah_kursi

    return SeatingTableSchema(
        id=table.id,
        session_id=table.session_id,
        nama_meja=table.nama_meja,
        kapasitas=table.kapasitas,
        kursi_terpakai=kursi_terpakai,
        assignments=assignments,
    )


def _assigned_seats_for_guest(db: Session, session_id: str, guest_id: int) -> int:
    rows = (
        db.query(SeatingAssignment)
        .filter(
            SeatingAssignment.session_id == session_id,
            SeatingAssignment.guest_id == guest_id,
        )
        .all()
    )
    return sum(r.jumlah_kursi for r in rows)


@router.post("/table", response_model=SeatingTableSchema)
def add_table(payload: SeatingTableCreateRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)

    if payload.kapasitas <= 0:
        raise HTTPException(status_code=400, detail="Kapasitas meja harus lebih dari 0.")

    table = SeatingTable(
        session_id=payload.session_id,
        nama_meja=payload.nama_meja,
        kapasitas=payload.kapasitas,
    )
    db.add(table)
    db.commit()
    db.refresh(table)
    return _serialize_table(db, table)


@router.get("/{session_id}/tables", response_model=List[SeatingTableSchema])
def list_tables(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    tables = (
        db.query(SeatingTable)
        .filter(SeatingTable.session_id == session_id)
        .order_by(SeatingTable.id)
        .all()
    )
    return [_serialize_table(db, t) for t in tables]


@router.get("/{session_id}/unassigned", response_model=List[UnassignedGuestSchema])
def list_unassigned_guests(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    guests = db.query(Guest).filter(Guest.session_id == session_id).all()

    result = []
    for g in guests:
        terpakai = _assigned_seats_for_guest(db, session_id, g.id)
        sisa = g.jumlah_orang - terpakai
        if sisa > 0:
            result.append(
                UnassignedGuestSchema(
                    guest_id=g.id, nama_tamu=g.nama_tamu, sisa_kursi=sisa
                )
            )
    return result


@router.patch("/table/{table_id}", response_model=SeatingTableSchema)
def update_table(table_id: int, payload: SeatingTableUpdateRequest, db: Session = Depends(get_db)):
    table = db.query(SeatingTable).filter(SeatingTable.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Meja tidak ditemukan.")

    if payload.nama_meja is not None:
        table.nama_meja = payload.nama_meja
    if payload.kapasitas is not None:
        if payload.kapasitas <= 0:
            raise HTTPException(status_code=400, detail="Kapasitas meja harus lebih dari 0.")
        kursi_terpakai = sum(a.jumlah_kursi for a in table.assignments)
        if payload.kapasitas < kursi_terpakai:
            raise HTTPException(
                status_code=400,
                detail=f"Kapasitas tidak boleh lebih kecil dari kursi yang sudah terisi ({kursi_terpakai}).",
            )
        table.kapasitas = payload.kapasitas

    db.commit()
    db.refresh(table)
    return _serialize_table(db, table)


@router.delete("/table/{table_id}")
def delete_table(table_id: int, db: Session = Depends(get_db)):
    table = db.query(SeatingTable).filter(SeatingTable.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Meja tidak ditemukan.")
    db.delete(table)  # cascade otomatis hapus assignment-nya juga
    db.commit()
    return {"message": "Meja berhasil dihapus."}


@router.post("/assign", response_model=SeatingTableSchema)
def assign_guest(payload: SeatingAssignRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)

    table = (
        db.query(SeatingTable)
        .filter(
            SeatingTable.id == payload.table_id,
            SeatingTable.session_id == payload.session_id,
        )
        .first()
    )
    if not table:
        raise HTTPException(status_code=404, detail="Meja tidak ditemukan.")

    guest = (
        db.query(Guest)
        .filter(
            Guest.id == payload.guest_id,
            Guest.session_id == payload.session_id,
        )
        .first()
    )
    if not guest:
        raise HTTPException(status_code=404, detail="Tamu tidak ditemukan.")

    sudah_terpakai_tamu = _assigned_seats_for_guest(db, payload.session_id, payload.guest_id)
    sisa_kursi_tamu = guest.jumlah_orang - sudah_terpakai_tamu

    jumlah_kursi = payload.jumlah_kursi if payload.jumlah_kursi is not None else sisa_kursi_tamu

    if jumlah_kursi <= 0:
        raise HTTPException(
            status_code=400,
            detail="Tamu ini sudah ditempatkan sepenuhnya di meja lain.",
        )
    if jumlah_kursi > sisa_kursi_tamu:
        raise HTTPException(
            status_code=400,
            detail=f"Jumlah kursi melebihi sisa rombongan tamu ini ({sisa_kursi_tamu} orang belum ditempatkan).",
        )

    kursi_terpakai_meja = sum(a.jumlah_kursi for a in table.assignments)
    if kursi_terpakai_meja + jumlah_kursi > table.kapasitas:
        sisa_kapasitas_meja = table.kapasitas - kursi_terpakai_meja
        raise HTTPException(
            status_code=400,
            detail=f"Kapasitas meja tidak cukup (sisa {sisa_kapasitas_meja} kursi).",
        )

    assignment = SeatingAssignment(
        session_id=payload.session_id,
        table_id=payload.table_id,
        guest_id=payload.guest_id,
        jumlah_kursi=jumlah_kursi,
    )
    db.add(assignment)
    db.commit()
    db.refresh(table)
    return _serialize_table(db, table)


@router.delete("/assign/{assignment_id}")
def unassign_guest(assignment_id: int, db: Session = Depends(get_db)):
    assignment = (
        db.query(SeatingAssignment).filter(SeatingAssignment.id == assignment_id).first()
    )
    if not assignment:
        raise HTTPException(status_code=404, detail="Penempatan tidak ditemukan.")
    db.delete(assignment)
    db.commit()
    return {"message": "Tamu berhasil dikeluarkan dari meja."}