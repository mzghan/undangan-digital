// frontend/src/pages/demo/PuspaBali/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Gede Wira Kusuma",
    panggilan: "Gede",
    anakKe: "Putra pertama",
    orangTua: "Bapak Nyoman Sudira & Ibu Wayan Sari",
  },
  wanita: {
    nama: "Ni Kadek Larasati Dewi",
    panggilan: "Larasati",
    anakKe: "Putri kedua",
    orangTua: "Bapak Made Suarta & Ibu Ketut Ayu",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-05-15",
    label: "15 Mei 2027",
    waktu: "08.00 – 10.00 WITA",
    lokasi: "Pura Taman Sari, Ubud, Bali",
  },
  resepsi: {
    tanggal: "2027-05-15",
    label: "15 Mei 2027",
    waktu: "11.00 – 14.00 WITA",
    lokasi: "Pura Taman Sari, Ubud, Bali",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";
export const musik = "/musik/puspa-bali.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  cover: ambilFotoPrewed(7, 1)[0],
  pria: fotoPria[1],
  wanita: fotoWanita[1],
  galeri: ambilFotoPrewed(1, 6),
};
