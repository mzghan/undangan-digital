import uuid
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.wedding_trial import TrialSession, CityPriceIndex, ConceptReference
from app.schemas.wedding_trial import (
    TrialStartResponse,
    Step1Request,
    Step1Response,
    Step2BudgetRequest,
    Step2BudgetResponse,
    PriceItemSchema,
    Step2KonsepRequest,
    Step2KonsepResponse,
    BudgetTierSchema,
    TrialSessionResponse,
)

router = APIRouter(prefix="/api/trial", tags=["Wedding Trial"])

KOTA_TERSEDIA = ["Jakarta", "Bandung"]
SESSION_DURATION_HOURS = 24


def _get_session_or_404(db: Session, session_id: str) -> TrialSession:
    session = db.query(TrialSession).filter(TrialSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sesi trial tidak ditemukan. Mulai ulang trial.")
    if session.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="Sesi trial sudah kedaluwarsa. Mulai ulang trial.")
    return session


def _hitung_breakdown(items: list[CityPriceIndex], budget_total: int):

    total_min = sum(i.harga_estimasi_min for i in items)
    total_max = sum(i.harga_estimasi_max for i in items)
    kota_midpoint = (total_min + total_max) / 2

    ratio = budget_total / kota_midpoint
    if ratio < 0.7:
        status_budget = "terbatas"
    elif ratio <= 1.3:
        status_budget = "normal"
    else:
        status_budget = "leluasa"

    def item_midpoint(item: CityPriceIndex) -> float:
        return (item.harga_estimasi_min + item.harga_estimasi_max) / 2

    def is_included(item: CityPriceIndex) -> bool:
        return not (status_budget == "terbatas" and item.prioritas == "opsional")

    included_items = [i for i in items if is_included(i)]
    total_included_midpoint = sum(item_midpoint(i) for i in included_items) or 1  

    def to_schema(item: CityPriceIndex) -> PriceItemSchema:
        included = is_included(item)
        if included:
            proporsi = item_midpoint(item) / total_included_midpoint
            harga_alokasi = round(proporsi * budget_total)
        else:
            harga_alokasi = 0
        return PriceItemSchema(
            item_name=item.item_name,
            kategori=item.kategori,
            prioritas=item.prioritas,
            harga_estimasi_min=item.harga_estimasi_min,
            harga_estimasi_max=item.harga_estimasi_max,
            harga_alokasi=harga_alokasi,
            bisa_diskip=not included,
        )

    items_wajib = [to_schema(i) for i in items if i.prioritas == "wajib"]
    items_penting = [to_schema(i) for i in items if i.prioritas == "penting"]
    items_opsional = [to_schema(i) for i in items if i.prioritas == "opsional"]

    return status_budget, total_min, total_max, items_wajib, items_penting, items_opsional


@router.post("/start", response_model=TrialStartResponse)
def start_trial():
    """Generate session_id baru. Belum disimpan ke DB di sini — baru disimpan
    saat user pilih kota di /step1, supaya tidak ada baris 'kosong' menumpuk
    di DB kalau user buka trial tapi tidak lanjut isi apa-apa."""
    session_id = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=SESSION_DURATION_HOURS)
    return TrialStartResponse(session_id=session_id, expires_at=expires_at.isoformat())


@router.post("/step1", response_model=Step1Response)
def choose_kota(payload: Step1Request, db: Session = Depends(get_db)):
    kota_tersedia = payload.kota in KOTA_TERSEDIA

    session = db.query(TrialSession).filter(TrialSession.session_id == payload.session_id).first()
    if session:
        session.kota = payload.kota
    else:
        session = TrialSession(
            session_id=payload.session_id,
            kota=payload.kota,
            jalur=None,
            created_at=datetime.utcnow(),
            expires_at=datetime.utcnow() + timedelta(hours=SESSION_DURATION_HOURS),
        )
        db.add(session)

    db.commit()

    return Step1Response(session_id=payload.session_id, kota=payload.kota, kota_tersedia=kota_tersedia)


@router.post("/step2-budget", response_model=Step2BudgetResponse)
def choose_budget(payload: Step2BudgetRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, payload.session_id)

    items = db.query(CityPriceIndex).filter(CityPriceIndex.kota == session.kota).all()
    if not items:
        raise HTTPException(status_code=404, detail=f"Data harga untuk kota {session.kota} belum tersedia.")

    status_budget, rata_rata_min, rata_rata_max, items_wajib, items_penting, items_opsional = (
        _hitung_breakdown(items, payload.budget_total)
    )

    session.jalur = "budget"
    session.budget_total = payload.budget_total
    session.konsep_pilihan = None
    db.commit()

    return Step2BudgetResponse(
        session_id=session.session_id,
        budget_total=payload.budget_total,
        rata_rata_kota_min=rata_rata_min,
        rata_rata_kota_max=rata_rata_max,
        status_budget=status_budget,
        items_wajib=items_wajib,
        items_penting=items_penting,
        items_opsional=items_opsional,
    )


@router.post("/step2-konsep", response_model=Step2KonsepResponse)
def choose_konsep(payload: Step2KonsepRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, payload.session_id)

    referensi = (
        db.query(ConceptReference)
        .filter(ConceptReference.kota == session.kota, ConceptReference.konsep == payload.konsep)
        .first()
    )
    if not referensi:
        raise HTTPException(
            status_code=404,
            detail=f"Referensi konsep '{payload.konsep}' untuk kota {session.kota} belum tersedia.",
        )

    items = db.query(CityPriceIndex).filter(CityPriceIndex.kota == session.kota).all()
    if not items:
        raise HTTPException(status_code=404, detail=f"Data harga untuk kota {session.kota} belum tersedia.")

    titik_budget = [
        ("Basic", referensi.estimasi_total_min),
        ("Ideal", round((referensi.estimasi_total_min + referensi.estimasi_total_max) / 2)),
        ("Premium", referensi.estimasi_total_max),
    ]

    tiers = []
    for label, budget_total in titik_budget:
        status_budget, _, _, items_wajib, items_penting, items_opsional = _hitung_breakdown(items, budget_total)
        tiers.append(
            BudgetTierSchema(
                label=label,
                budget_total=budget_total,
                status_budget=status_budget,
                items_wajib=items_wajib,
                items_penting=items_penting,
                items_opsional=items_opsional,
            )
        )

    session.jalur = "konsep"
    session.konsep_pilihan = payload.konsep
    session.budget_total = None
    db.commit()

    return Step2KonsepResponse(
        session_id=session.session_id,
        konsep=payload.konsep,
        nama_referensi=referensi.nama_referensi,
        deskripsi_singkat=referensi.deskripsi_singkat,
        tiers=tiers,
    )


@router.get("/{session_id}", response_model=TrialSessionResponse)
def get_trial_session(session_id: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_id)
    return TrialSessionResponse(
        session_id=session.session_id,
        kota=session.kota,
        jalur=session.jalur,
        budget_total=session.budget_total,
        konsep_pilihan=session.konsep_pilihan,
        created_at=session.created_at.isoformat(),
        expires_at=session.expires_at.isoformat(),
    )