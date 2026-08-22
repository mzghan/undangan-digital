// frontend/src/pages/demo/KoranLama/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Raden Aryo Kusuma",
    panggilan: "Aryo",
    anakKe: "Putra pertama",
    orangTua: "Bapak Soemantri & Ibu Kartini",
  },
  wanita: {
    nama: "Anindita Prameswari",
    panggilan: "Anindita",
    anakKe: "Putri sulung",
    orangTua: "Bapak Hartono & Ibu Sumarni",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-06-05",
    label: "5 Juni 2027",
    waktu: "08.00 – 10.00 WIB",
    lokasi: "Pendopo Agung Wiryosaputro, Yogyakarta",
  },
  resepsi: {
    tanggal: "2027-06-05",
    label: "5 Juni 2027",
    waktu: "11.00 – 14.00 WIB",
    lokasi: "Pendopo Agung Wiryosaputro, Yogyakarta",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";

export const edisi = {
  namaKoran: "Warta Pawiwahan",
  edisiKe: "No. 05 — Tahun MMXXVII",
  tanggalTerbit: "Edisi Khusus Pernikahan",
  harga: "Harga: Doa Restu Anda",
};
export const musik = "/musik/koran-lama.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  cover: ambilFotoPrewed(6, 1)[0],
  pria: fotoPria[0],
  wanita: fotoWanita[0],
  galeri: ambilFotoPrewed(0, 6),
};
