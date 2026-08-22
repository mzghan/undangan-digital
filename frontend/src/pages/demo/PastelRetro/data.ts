// frontend/src/pages/demo/PastelRetro/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Bimo Prakoso",
    panggilan: "Bimo",
    anakKe: "Putra pertama",
    orangTua: "Bapak Sutrisno & Ibu Endang",
  },
  wanita: {
    nama: "Citra Ayu Ningsih",
    panggilan: "Citra",
    anakKe: "Putri kedua",
    orangTua: "Bapak Wahyu Nugroho & Ibu Sri",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-09-04",
    label: "4 September 2027",
    waktu: "09.00 – 10.30 WIB",
    lokasi: "Taman Budaya, Yogyakarta",
  },
  resepsi: {
    tanggal: "2027-09-04",
    label: "4 September 2027",
    waktu: "11.00 – 14.00 WIB",
    lokasi: "Taman Budaya, Yogyakarta",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";
export const musik = "/musik/pastel-retro.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  pria: fotoPria[0],
  wanita: fotoWanita[0],
  galeri: ambilFotoPrewed(8, 6),
};
