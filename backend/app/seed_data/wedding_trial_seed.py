

from app.models.wedding_trial import CityPriceIndex, ConceptReference


# Dummy data — city_price_index harga estimasi kasar belum ril
# Asumsi skala pernikahan sedang (~200-300 tamu). Bandung diasumsikan
# ~65-75% dari harga Jakarta untuk item sejenis.

city_price_index_dummy = [
    # ---------------- JAKARTA ----------------
    {"kota": "Jakarta", "item_name": "Sewa Gedung / Venue", "kategori": "venue",
     "prioritas": "wajib", "harga_estimasi_min": 50_000_000, "harga_estimasi_max": 150_000_000},
    {"kota": "Jakarta", "item_name": "Catering (200-300 tamu)", "kategori": "catering",
     "prioritas": "wajib", "harga_estimasi_min": 60_000_000, "harga_estimasi_max": 120_000_000},
    {"kota": "Jakarta", "item_name": "Dokumentasi (Foto + Video)", "kategori": "dokumentasi",
     "prioritas": "wajib", "harga_estimasi_min": 15_000_000, "harga_estimasi_max": 40_000_000},
    {"kota": "Jakarta", "item_name": "MUA Pengantin (Akad + Resepsi)", "kategori": "mua",
     "prioritas": "wajib", "harga_estimasi_min": 8_000_000, "harga_estimasi_max": 25_000_000},
    {"kota": "Jakarta", "item_name": "Busana Pengantin (Akad + Resepsi)", "kategori": "busana",
     "prioritas": "wajib", "harga_estimasi_min": 15_000_000, "harga_estimasi_max": 50_000_000},

    {"kota": "Jakarta", "item_name": "Dekorasi Utama", "kategori": "dekorasi",
     "prioritas": "penting", "harga_estimasi_min": 20_000_000, "harga_estimasi_max": 60_000_000},
    {"kota": "Jakarta", "item_name": "Sound System & MC", "kategori": "hiburan",
     "prioritas": "penting", "harga_estimasi_min": 8_000_000, "harga_estimasi_max": 20_000_000},
    {"kota": "Jakarta", "item_name": "Undangan (Cetak/Digital)", "kategori": "lain",
     "prioritas": "penting", "harga_estimasi_min": 2_000_000, "harga_estimasi_max": 8_000_000},

    {"kota": "Jakarta", "item_name": "Busana Bridesmaid/Groomsmen", "kategori": "busana",
     "prioritas": "opsional", "harga_estimasi_min": 10_000_000, "harga_estimasi_max": 30_000_000},
    {"kota": "Jakarta", "item_name": "Photobooth", "kategori": "hiburan",
     "prioritas": "opsional", "harga_estimasi_min": 5_000_000, "harga_estimasi_max": 12_000_000},
    {"kota": "Jakarta", "item_name": "Souvenir Tamu", "kategori": "lain",
     "prioritas": "opsional", "harga_estimasi_min": 5_000_000, "harga_estimasi_max": 15_000_000},
    {"kota": "Jakarta", "item_name": "Hiburan Tambahan (Band/DJ)", "kategori": "hiburan",
     "prioritas": "opsional", "harga_estimasi_min": 10_000_000, "harga_estimasi_max": 30_000_000},

    # ---------------- BANDUNG ----------------
    {"kota": "Bandung", "item_name": "Sewa Gedung / Venue", "kategori": "venue",
     "prioritas": "wajib", "harga_estimasi_min": 35_000_000, "harga_estimasi_max": 110_000_000},
    {"kota": "Bandung", "item_name": "Catering (200-300 tamu)", "kategori": "catering",
     "prioritas": "wajib", "harga_estimasi_min": 42_000_000, "harga_estimasi_max": 85_000_000},
    {"kota": "Bandung", "item_name": "Dokumentasi (Foto + Video)", "kategori": "dokumentasi",
     "prioritas": "wajib", "harga_estimasi_min": 10_000_000, "harga_estimasi_max": 28_000_000},
    {"kota": "Bandung", "item_name": "MUA Pengantin (Akad + Resepsi)", "kategori": "mua",
     "prioritas": "wajib", "harga_estimasi_min": 6_000_000, "harga_estimasi_max": 18_000_000},
    {"kota": "Bandung", "item_name": "Busana Pengantin (Akad + Resepsi)", "kategori": "busana",
     "prioritas": "wajib", "harga_estimasi_min": 10_000_000, "harga_estimasi_max": 35_000_000},

    {"kota": "Bandung", "item_name": "Dekorasi Utama", "kategori": "dekorasi",
     "prioritas": "penting", "harga_estimasi_min": 14_000_000, "harga_estimasi_max": 42_000_000},
    {"kota": "Bandung", "item_name": "Sound System & MC", "kategori": "hiburan",
     "prioritas": "penting", "harga_estimasi_min": 6_000_000, "harga_estimasi_max": 14_000_000},
    {"kota": "Bandung", "item_name": "Undangan (Cetak/Digital)", "kategori": "lain",
     "prioritas": "penting", "harga_estimasi_min": 1_500_000, "harga_estimasi_max": 6_000_000},

    {"kota": "Bandung", "item_name": "Busana Bridesmaid/Groomsmen", "kategori": "busana",
     "prioritas": "opsional", "harga_estimasi_min": 7_000_000, "harga_estimasi_max": 20_000_000},
    {"kota": "Bandung", "item_name": "Photobooth", "kategori": "hiburan",
     "prioritas": "opsional", "harga_estimasi_min": 3_500_000, "harga_estimasi_max": 9_000_000},
    {"kota": "Bandung", "item_name": "Souvenir Tamu", "kategori": "lain",
     "prioritas": "opsional", "harga_estimasi_min": 3_500_000, "harga_estimasi_max": 10_000_000},
    {"kota": "Bandung", "item_name": "Hiburan Tambahan (Band/DJ)", "kategori": "hiburan",
     "prioritas": "opsional", "harga_estimasi_min": 7_000_000, "harga_estimasi_max": 20_000_000},
]


concept_reference_dummy = [
    # ---------------- JAKARTA ----------------
    {"kota": "Jakarta", "konsep": "gedung", "nama_referensi": "Ballroom Hotel Bintang 4-5",
     "estimasi_total_min": 150_000_000, "estimasi_total_max": 400_000_000,
     "deskripsi_singkat": "Ballroom hotel dengan kapasitas besar, cocok untuk resepsi formal skala besar dengan fasilitas lengkap."},
    {"kota": "Jakarta", "konsep": "taman", "nama_referensi": "Garden Party Outdoor",
     "estimasi_total_min": 100_000_000, "estimasi_total_max": 250_000_000,
     "deskripsi_singkat": "Konsep outdoor di taman/rooftop garden, suasana natural, perlu antisipasi tenda & cuaca."},
    {"kota": "Jakarta", "konsep": "cafe", "nama_referensi": "Intimate Wedding di Cafe/Resto",
     "estimasi_total_min": 50_000_000, "estimasi_total_max": 120_000_000,
     "deskripsi_singkat": "Konsep pernikahan intim dengan kapasitas tamu terbatas (50-100 orang), suasana hangat dan personal."},

    # ---------------- BANDUNG ----------------
    {"kota": "Bandung", "konsep": "gedung", "nama_referensi": "Gedung Serbaguna / Hotel",
     "estimasi_total_min": 100_000_000, "estimasi_total_max": 300_000_000,
     "deskripsi_singkat": "Gedung atau ballroom hotel dengan kapasitas menengah-besar, cocok untuk resepsi tradisional maupun modern."},
    {"kota": "Bandung", "konsep": "taman", "nama_referensi": "Garden Party dengan Nuansa Pegunungan",
     "estimasi_total_min": 70_000_000, "estimasi_total_max": 180_000_000,
     "deskripsi_singkat": "Konsep outdoor memanfaatkan suasana sejuk Bandung, cocok untuk tema rustic/natural."},
    {"kota": "Bandung", "konsep": "cafe", "nama_referensi": "Intimate Wedding di Cafe/Resto",
     "estimasi_total_min": 35_000_000, "estimasi_total_max": 90_000_000,
     "deskripsi_singkat": "Konsep pernikahan kecil dan hangat di cafe/resto, cocok untuk pasangan dengan tamu terbatas."},
]


def seed_wedding_trial(db):

    db.query(CityPriceIndex).delete()
    for data in city_price_index_dummy:
        db.add(CityPriceIndex(**data))

    db.query(ConceptReference).delete()
    for data in concept_reference_dummy:
        db.add(ConceptReference(**data))

    print(f"Seed selesai: {len(city_price_index_dummy)} city_price_index ditambahkan.")
    print(f"Seed selesai: {len(concept_reference_dummy)} concept_reference ditambahkan.")