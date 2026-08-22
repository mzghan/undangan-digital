// frontend/src/pages/demo/BohoSavana/data.ts
import { fotoPria, fotoWanita, ambilFotoPrewed } from "../../../data/fotoDemo";

export const mempelai = {
  pria: {
    nama: "Dimas Aryasatya",
    panggilan: "Dimas",
    anakKe: "Putra kedua",
    orangTua: "Bapak Bambang Aryo & Ibu Retno",
  },
  wanita: {
    nama: "Intan Permatasari",
    panggilan: "Intan",
    anakKe: "Putri pertama",
    orangTua: "Bapak Yoga Permana & Ibu Diah",
  },
};

export const acara = {
  akad: {
    tanggal: "2027-07-10",
    label: "10 Juli 2027",
    waktu: "08.00 – 10.00 WIB",
    lokasi: "Kebun Anggrek Garden, Bandung",
  },
  resepsi: {
    tanggal: "2027-07-10",
    label: "10 Juli 2027",
    waktu: "11.00 – 15.00 WIB",
    lokasi: "Kebun Anggrek Garden, Bandung",
  },
  mapsUrl: "https://maps.google.com",
};

export const tamuDefault = "Bapak/Ibu/Saudara/i";
export const musik = "/musik/boho-savana.mp3";
export const judulMusik = "Musik Latar";
export const foto = {
  cover: ambilFotoPrewed(10, 1)[0],
  pria: fotoPria[0],
  wanita: fotoWanita[1],
  galeri: ambilFotoPrewed(4, 6),
};
