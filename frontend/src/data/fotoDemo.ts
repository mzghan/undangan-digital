// frontend/src/data/fotoDemo.ts
// Kumpulan foto contoh yang dipakai bersama oleh semua tema demo undangan.
// Ganti isi file-file di /public/foto (nama file tetap sama) untuk mengganti fotonya,
// atau ganti langsung path di sini kalau mau pakai nama file lain.

export const fotoPria = ["/foto/pria-01.jfif", "/foto/pria-02.jfif"];
export const fotoWanita = ["/foto/wanita-01.jfif", "/foto/wanita-02.jfif"];

export const fotoPrewed = [
  "/foto/prewed-01.jfif",
  "/foto/prewed-02.jfif",
  "/foto/prewed-03.jfif",
  "/foto/prewed-04.jfif",
  "/foto/prewed-05.jfif",
  "/foto/prewed-06.jfif",
  "/foto/prewed-07.jfif",
  "/foto/prewed-08.jfif",
  "/foto/prewed-09.jfif",
  "/foto/prewed-10.jfif",
  "/foto/prewed-11.jfif",
];

/**
 * Ambil `count` foto prewed berurutan mulai dari index `start`, memutar kembali
 * ke awal array kalau kehabisan. Dipakai supaya tiap tema demo menampilkan
 * kombinasi foto galeri yang berbeda meski sumbernya sama.
 */
export function ambilFotoPrewed(start: number, count: number): string[] {
  const hasil: string[] = [];
  for (let i = 0; i < count; i++) {
    hasil.push(fotoPrewed[(start + i) % fotoPrewed.length]);
  }
  return hasil;
}
