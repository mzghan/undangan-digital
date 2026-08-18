from app.database import SessionLocal, engine, Base
from app.models.tema import Tema
from app.models.portofolio import Portofolio
from app.models.testimoni import Testimoni
from app.models.planner_package import PlannerPackage
from app.models.wedding_trial import TrialSession, CityPriceIndex, ConceptReference  
from app.seed_data.wedding_trial_seed import seed_wedding_trial                       


Base.metadata.create_all(bind=engine)

db = SessionLocal()

temas_dummy = [
    {
        "nama": "Melati Senja",
        "kategori": "minimalis",
        "harga": 150000,
        "gambar_url": "https://placehold.co/400x600?text=Melati+Senja",
        "deskripsi": "Desain minimalis dengan sentuhan warna pastel yang lembut.",
    },
    {
        "nama": "Kirana Adat",
        "kategori": "adat",
        "harga": 250000,
        "gambar_url": "https://placehold.co/400x600?text=Kirana+Adat",
        "deskripsi": "Terinspirasi motif batik dan ornamen tradisional Jawa.",
    },
    {
        "nama": "Nusa Modern",
        "kategori": "modern",
        "harga": 200000,
        "gambar_url": "https://placehold.co/400x600?text=Nusa+Modern",
        "deskripsi": "Tampilan bold dengan tipografi besar dan layout asimetris.",
    },
    {
        "nama": "Anggrek Klasik",
        "kategori": "minimalis",
        "harga": 175000,
        "gambar_url": "https://placehold.co/400x600?text=Anggrek+Klasik",
        "deskripsi": "Elegan dan timeless, cocok untuk berbagai tema pernikahan.",
    },
]

db.query(Tema).delete()

for data in temas_dummy:
    tema = Tema(**data)
    db.add(tema)

portofolio_dummy = [
    {
        "judul": "Undangan Rani & Aditya",
        "kategori": "minimalis",
        "gambar_url": "https://placehold.co/500x500?text=Rani+%26+Aditya",
        "deskripsi": "Pernikahan intimate dengan nuansa pastel di Bandung.",
        "nama_klien": "Rani & Aditya",
    },
    {
        "judul": "Undangan Sari & Bagus",
        "kategori": "adat",
        "gambar_url": "https://placehold.co/500x500?text=Sari+%26+Bagus",
        "deskripsi": "Prosesi adat Jawa lengkap dengan ornamen tradisional.",
        "nama_klien": "Sari & Bagus",
    },
    {
        "judul": "Undangan Dinda & Fajar",
        "kategori": "modern",
        "gambar_url": "https://placehold.co/500x500?text=Dinda+%26+Fajar",
        "deskripsi": "Konsep garden party modern dengan tipografi bold.",
        "nama_klien": "Dinda & Fajar",
    },
]

db.query(Portofolio).delete()

for data in portofolio_dummy:
    item = Portofolio(**data)
    db.add(item)


testimoni_dummy = [
    {
        "nama": "Putri Wulandari",
        "rating": 5,
        "isi": "Prosesnya cepat banget dan hasilnya jauh melebihi ekspektasi. Tamu-tamu banyak yang tanya bikin di mana!",
        "foto_url": None,
    },
    {
        "nama": "Reza Pratama",
        "rating": 5,
        "isi": "Timnya responsif dan sabar banget ngelayanin revisi. Recommended untuk yang mau undangan estetik tapi budget terjangkau.",
        "foto_url": None,
    },
    {
        "nama": "Ayu Kartika",
        "rating": 4,
        "isi": "Desainnya bagus, cuma revisi agak lama karena lagi rame. Overall puas kok.",
        "foto_url": None,
    },
]

db.query(Testimoni).delete()

for data in testimoni_dummy:
    item = Testimoni(**data)
    db.add(item)

planner_dummy = [
    {
        "nama_paket": "Paket Basic",
        "harga": 99000,
        "jumlah_sheet": 5,
        "fitur": "Checklist Persiapan,Budget Tracker Sederhana,Timeline H-1 Tahun",
        "deskripsi": "Cocok untuk pasangan yang ingin mulai merencanakan pernikahan secara mandiri.",
    },
    {
        "nama_paket": "Paket Premium",
        "harga": 199000,
        "jumlah_sheet": 12,
        "fitur": "Checklist Lengkap,Budget Tracker Detail,Checklist Vendor,Timeline H-1 Tahun,Guest List Manager,Seating Chart",
        "deskripsi": "Paket paling lengkap dengan semua tools yang dibutuhkan dari persiapan hingga hari-H.",
    },
    {
        "nama_paket": "Paket Vendor Tracker",
        "harga": 79000,
        "jumlah_sheet": 3,
        "fitur": "Checklist Vendor,Kontak & Kontrak Tracker,Jadwal Pembayaran DP",
        "deskripsi": "Fokus khusus untuk mengelola komunikasi dan pembayaran ke vendor.",
    },
]

db.query(PlannerPackage).delete()

for data in planner_dummy:
    item = PlannerPackage(**data)
    db.add(item)

seed_wedding_trial(db)

db.commit()
db.close()

print(f"Seed selesai: {len(portofolio_dummy)} portofolio ditambahkan.")
print(f"Seed selesai: {len(temas_dummy)} tema ditambahkan.")
print(f"Seed selesai: {len(testimoni_dummy)} testimoni ditambahkan.")
print(f"Seed selesai: {len(planner_dummy)} planner package ditambahkan.")