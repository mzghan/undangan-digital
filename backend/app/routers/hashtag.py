import re
from fastapi import APIRouter

from app.schemas.hashtag import HashtagRequest, HashtagResponse

router = APIRouter(
    prefix="/api/hashtag",
    tags=["Aksara Hashtag"],
)


def bersihkan_nama(nama: str) -> str:
    """Hapus spasi & karakter non-huruf, kapitalisasi rapi."""
    nama = re.sub(r"[^a-zA-Z]", "", nama)
    return nama.strip().capitalize()


def generate_hashtags(pria: str, wanita: str) -> list[str]:
    pria = bersihkan_nama(pria)
    wanita = bersihkan_nama(wanita)

    hasil = set()  # pakai set biar otomatis tidak ada duplikat

    # Pola 1: gabungan nama penuh
    hasil.add(f"#{pria}{wanita}")
    hasil.add(f"#{wanita}{pria}")

    # Pola 2: gabungan dengan kata penghubung pernikahan
    hasil.add(f"#{pria}And{wanita}")
    hasil.add(f"#{pria}Weds{wanita}")
    hasil.add(f"#{pria}{wanita}Wedding")

    # Pola 3: potongan suku kata depan (biar lebih pendek/catchy)
    potongan_pria = pria[:3]
    potongan_wanita = wanita[:3]
    hasil.add(f"#{potongan_pria}{potongan_wanita}Married")

    # Pola 4: rima sederhana - akhiran sama antara nama pria & wanita
    if pria[-2:].lower() == wanita[-2:].lower():
        hasil.add(f"#{pria}{wanita}Rhyme")

    # Pola 5: gabungan dengan tahun-agnostic "TheWedding"
    hasil.add(f"#TheWeddingOf{pria}And{wanita}")

    return sorted(hasil)


@router.post("/generate", response_model=HashtagResponse)
def generate(payload: HashtagRequest):
    hashtags = generate_hashtags(payload.nama_pria, payload.nama_wanita)
    return HashtagResponse(hashtags=hashtags)