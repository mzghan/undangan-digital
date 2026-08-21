from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.vendorPayment import VendorPayment
from app.models.vendor import Vendor
from app.routers.wedding_trial import _get_session_or_404
from app.schemas.vendorPayment import (
    VendorPaymentSchema,
    VendorPaymentCreateRequest,
    VendorPaymentUpdateRequest,
    VendorPaymentSummary,
)

router = APIRouter(prefix="/api/trial/vendor-payment-premium", tags=["Vendor Payment Premium"])


def _serialize(payment: VendorPayment, vendor_nama: str) -> VendorPaymentSchema:
    return VendorPaymentSchema(
        id=payment.id,
        session_id=payment.session_id,
        vendor_id=payment.vendor_id,
        vendor_nama=vendor_nama,
        judul=payment.judul,
        nominal=payment.nominal,
        tanggal_jatuh_tempo=payment.tanggal_jatuh_tempo,
        status_bayar=payment.status_bayar,
        tanggal_dibayar=payment.tanggal_dibayar,
        catatan=payment.catatan,
    )


@router.post("", response_model=VendorPaymentSchema)
def add_payment(payload: VendorPaymentCreateRequest, db: Session = Depends(get_db)):
    _get_session_or_404(db, payload.session_id)

    vendor = (
        db.query(Vendor)
        .filter(Vendor.id == payload.vendor_id, Vendor.session_id == payload.session_id)
        .first()
    )
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor tidak ditemukan di sesi ini.")

    payment = VendorPayment(
        session_id=payload.session_id,
        vendor_id=payload.vendor_id,
        judul=payload.judul,
        nominal=payload.nominal,
        tanggal_jatuh_tempo=(
            datetime.fromisoformat(payload.tanggal_jatuh_tempo)
            if payload.tanggal_jatuh_tempo
            else None
        ),
        catatan=payload.catatan,
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return _serialize(payment, vendor.nama_vendor)


@router.get("/{session_id}", response_model=List[VendorPaymentSchema])
def list_payments(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    rows = (
        db.query(VendorPayment, Vendor.nama_vendor)
        .join(Vendor, VendorPayment.vendor_id == Vendor.id)
        .filter(VendorPayment.session_id == session_id)
        .order_by(VendorPayment.tanggal_jatuh_tempo)
        .all()
    )
    return [_serialize(payment, vendor_nama) for payment, vendor_nama in rows]


@router.get("/{session_id}/summary", response_model=VendorPaymentSummary)
def summary_payments(session_id: str, db: Session = Depends(get_db)):
    _get_session_or_404(db, session_id)
    payments = db.query(VendorPayment).filter(VendorPayment.session_id == session_id).all()

    total_terjadwal = sum(p.nominal for p in payments)
    total_lunas = sum(p.nominal for p in payments if p.status_bayar == "lunas")
    total_belum_lunas = total_terjadwal - total_lunas
    jumlah_termin_lunas = sum(1 for p in payments if p.status_bayar == "lunas")
    jumlah_termin_belum_lunas = len(payments) - jumlah_termin_lunas

    return VendorPaymentSummary(
        total_terjadwal=total_terjadwal,
        total_lunas=total_lunas,
        total_belum_lunas=total_belum_lunas,
        jumlah_termin_lunas=jumlah_termin_lunas,
        jumlah_termin_belum_lunas=jumlah_termin_belum_lunas,
    )


@router.patch("/item/{payment_id}", response_model=VendorPaymentSchema)
def update_payment(payment_id: int, payload: VendorPaymentUpdateRequest, db: Session = Depends(get_db)):
    payment = db.query(VendorPayment).filter(VendorPayment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Jadwal pembayaran tidak ditemukan.")

    if payload.judul is not None:
        payment.judul = payload.judul
    if payload.nominal is not None:
        payment.nominal = payload.nominal
    if payload.tanggal_jatuh_tempo is not None:
        payment.tanggal_jatuh_tempo = datetime.fromisoformat(payload.tanggal_jatuh_tempo)
    if payload.status_bayar is not None:
        payment.status_bayar = payload.status_bayar
        if payload.status_bayar == "lunas" and payment.tanggal_dibayar is None:
            payment.tanggal_dibayar = datetime.utcnow()
        if payload.status_bayar == "belum_bayar":
            payment.tanggal_dibayar = None
    if payload.tanggal_dibayar is not None:
        payment.tanggal_dibayar = datetime.fromisoformat(payload.tanggal_dibayar)
    if payload.catatan is not None:
        payment.catatan = payload.catatan

    payment.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(payment)

    vendor = db.query(Vendor).filter(Vendor.id == payment.vendor_id).first()
    return _serialize(payment, vendor.nama_vendor if vendor else "(vendor dihapus)")


@router.delete("/item/{payment_id}")
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = db.query(VendorPayment).filter(VendorPayment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Jadwal pembayaran tidak ditemukan.")
    db.delete(payment)
    db.commit()
    return {"message": "Jadwal pembayaran berhasil dihapus."}