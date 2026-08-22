// frontend/src/pages/demo/FloralBlanc/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Farrel Adiwangsa",
    panggilan: "Farrel",
    anakKe: "Putra pertama",
    orangTua: "Bapak Hendra Wijaya & Ibu Meilani",
  },
  wanita: {
    nama: "Naila Zahra Ramadhani",
    panggilan: "Naila",
    anakKe: "Putri pertama",
    orangTua: "Bapak Arief Ramadhan & Ibu Sinta",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-01-23",
    label: "23 Januari 2027",
    waktu: "08.00 – 10.00 WIB",
    lokasi: "Grand Ballroom, Hotel Mulia, Jakarta",
  },
  resepsi: {
    tanggal: "2027-01-23",
    label: "23 Januari 2027",
    waktu: "11.00 – 14.00 WIB",
    lokasi: "Grand Ballroom, Hotel Mulia, Jakarta",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";
export const musik = "/musik/floral-blanc.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  cover: ambilFotoPrewed(10, 1)[0],
  pria: fotoPria[1],
  wanita: fotoWanita[0],
  galeri: ambilFotoPrewed(6, 4),
};
