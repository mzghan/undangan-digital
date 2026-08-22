// frontend/src/pages/demo/SenjaAesthetic/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Bagas Nararya",
    panggilan: "Bagas",
    anakKe: "Putra kedua",
    orangTua: "Bapak Yusuf & Ibu Ratna",
  },
  wanita: {
    nama: "Alika Putri Wijaya",
    panggilan: "Alika",
    anakKe: "Putri pertama",
    orangTua: "Bapak Dimas & Ibu Sari",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-03-06",
    label: "6 Maret 2027",
    waktu: "09.00 – 10.30 WIB",
    lokasi: "The Garden Hall, Bogor",
  },
  resepsi: {
    tanggal: "2027-03-06",
    label: "6 Maret 2027",
    waktu: "11.00 – 15.00 WIB",
    lokasi: "The Garden Hall, Bogor",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";
export const musik = "/musik/senja-aesthetic.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  cover: ambilFotoPrewed(9, 1)[0],
  pria: fotoPria[0],
  wanita: fotoWanita[1],
  galeri: ambilFotoPrewed(3, 6),
};
