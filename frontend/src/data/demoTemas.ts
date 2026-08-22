// frontend/src/data/demoTemas.ts

export type FilterGrup = 'hits' | 'adat' | 'trend';

export type DemoTema = {
  slug: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  path: string;
  gradient: string; // tailwind gradient classes untuk preview kartu
  grup: FilterGrup[]; // filter kategori: bisa masuk lebih dari satu grup
};

export const demoTemas: DemoTema[] = [
  {
    slug: 'kembang-sriwijaya',
    nama: 'Kembang Sriwijaya',
    kategori: 'adat',
    deskripsi: 'Nuansa songket & motif geometris khas Palembang.',
    path: '/undangan-digital/demo/kembang-sriwijaya',
    gradient: 'from-[#d9b98a] via-[#8a5a2b] to-[#2b1b12]',
    grup: ['adat', 'hits'],
  },
  {
    slug: 'senja-aesthetic',
    nama: 'Senja Aesthetic',
    kategori: 'aesthetic',
    deskripsi: 'Gradasi warna senja yang hangat dan romantis.',
    path: '/undangan-digital/demo/senja-aesthetic',
    gradient: 'from-[#e9c4ad] via-[#c17b5f] to-[#8a5a45]',
    grup: ['trend'],
  },
  {
    slug: 'puspa-bali',
    nama: 'Puspa Bali',
    kategori: 'adat',
    deskripsi: 'Terinspirasi ukiran dan warna emas khas Bali.',
    path: '/undangan-digital/demo/puspa-bali',
    gradient: 'from-[#e3c878] via-[#c9a24b] to-[#5c1f1f]',
    grup: ['adat', 'hits'],
  },
  {
    slug: 'floral-blanc',
    nama: 'Floral Blanc',
    kategori: 'minimalis',
    deskripsi: 'Putih bersih dengan sentuhan floral yang lembut.',
    path: '/undangan-digital/demo/floral-blanc',
    gradient: 'from-[#e8c9c9] via-[#c9a06e] to-[#9c6b6b]',
    grup: ['trend'],
  },
  {
    slug: 'boho-savana',
    nama: 'Boho Savana',
    kategori: 'boho',
    deskripsi: 'Warna tanah dan tekstur savana bergaya bohemian.',
    path: '/undangan-digital/demo/boho-savana',
    gradient: 'from-[#ddb98a] via-[#b5654a] to-[#6b4230]',
    grup: ['trend'],
  },
  {
    slug: 'dark-luxury-noir',
    nama: 'Dark Luxury Noir',
    kategori: 'luxury',
    deskripsi: 'Hitam elegan berpadu aksen emas mewah.',
    path: '/undangan-digital/demo/dark-luxury-noir',
    gradient: 'from-[#3a3a3a] via-[#d4af6a] to-[#0a0a0a]',
    grup: ['hits', 'trend'],
  },
  {
    slug: 'pastel-retro',
    nama: 'Pastel Retro',
    kategori: 'retro',
    deskripsi: 'Warna pastel ceria dengan sentuhan gaya retro.',
    path: '/undangan-digital/demo/pastel-retro',
    gradient: 'from-[#ffd9b3] via-[#d17a9e] to-[#b06a8c]',
    grup: ['trend'],
  },
  {
    slug: 'netflix',
    nama: 'Netflix',
    kategori: 'kreatif',
    deskripsi: 'Terinspirasi tampilan aplikasi streaming favorit.',
    path: '/undangan-digital/demo/netflix',
    gradient: 'from-[#3a3a3a] via-[#E50914] to-[#0a0a0a]',
    grup: ['hits', 'trend'],
  },
  {
    slug: 'koran-lama',
    nama: 'Koran Lama',
    kategori: 'vintage',
    deskripsi: 'Gaya halaman depan koran zaman dulu yang unik.',
    path: '/undangan-digital/demo/koran',
    gradient: 'from-[#f4ecd8] via-[#c9bd9e] to-[#2b2620]',
    grup: ['hits'],
  },
];
