export interface Testimoni {
  id: number;
  nama: string;
  rating: number;
  isi: string;
  foto_url: string | null;
}

export interface TestimoniInput {
  nama: string;
  rating: number;
  isi: string;
  foto_url?: string | null;
}
