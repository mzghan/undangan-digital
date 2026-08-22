import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTestimoni } from "../api/testimoni";
import { demoTemas } from "../data/demoTemas";
import Divider from "../components/Divider";
import HeroShowcase from "../components/HeroShowcase";

function Beranda() {
  const temaPopuler = demoTemas.slice(0, 3);

  const { data: testimoniList } = useQuery({
    queryKey: ["testimoni"],
    queryFn: getTestimoni,
  });

  return (
    <div className="bg-brand-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-400 mb-4">
              Studio Kreatif Pernikahan
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brand-700 leading-tight">
              Undangan Digital,
              <br />
              <span className="italic font-medium">yang Berkesan</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto lg:mx-0 mt-6 leading-relaxed">
              Kami mengukir setiap detail undangan pernikahanmu dengan
              ketenangan dan keanggunan — dari desain, perencanaan, hingga
              hashtag yang akan dikenang selamanya.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
              <Link
                to="/undangan-digital"
                className="bg-brand-700 text-white px-6 py-3 rounded-md hover:bg-brand-800 transition-colors font-medium"
              >
                Lihat Katalog Undangan
              </Link>
              <Link
                to="/wedding-planner"
                className="border border-brand-700 text-brand-700 px-6 py-3 rounded-md hover:bg-brand-100 transition-colors font-medium"
              >
                Wedding Planner
              </Link>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      <Divider />

      {/* Ringkasan Layanan */}
      <section className="max-w-6xl mx-auto py-16 px-8">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-400 text-center mb-2">
          Layanan Kami
        </p>
        <h2 className="font-heading text-3xl text-brand-700 text-center mb-12">
          Semua yang kamu butuhkan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              to: "/undangan-digital",
              title: "Undangan Digital",
              desc: "Pilih dari berbagai tema undangan siap pakai, dari minimalis hingga adat tradisional.",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
                  <rect
                    x="6"
                    y="10"
                    width="36"
                    height="28"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 12L24 26L42 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              to: "/wedding-planner",
              title: "Wedding Planner",
              desc: "Checklist dan tracker digital untuk membantu persiapan pernikahanmu tetap terorganisir.",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
                  <rect
                    x="10"
                    y="6"
                    width="28"
                    height="36"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17 18L21 22L31 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="17"
                    y1="30"
                    x2="31"
                    y2="30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="17"
                    y1="35"
                    x2="26"
                    y2="35"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              to: "/aksara-hashtag",
              title: "Aksara Hashtag",
              desc: "Generate hashtag pernikahan unik dari nama panggilan kalian berdua, gratis.",
              icon: (
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
                  <line
                    x1="18"
                    y1="8"
                    x2="14"
                    y2="40"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="34"
                    y1="8"
                    x2="30"
                    y2="40"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="10"
                    y1="18"
                    x2="40"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="30"
                    x2="38"
                    y2="30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white p-7 rounded-lg border border-brand-100 hover:border-brand-400 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-heading text-xl text-brand-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* Preview Tema */}
      <section className="max-w-6xl mx-auto py-16 px-8">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-400 text-center mb-2">
          Katalog
        </p>
        <h2 className="font-heading text-3xl text-brand-700 text-center mb-12">
          Tema Populer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {temaPopuler.map((tema) => (
            <Link
              key={tema.slug}
              to={tema.path}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden border border-brand-100 hover:shadow-md transition-shadow"
            >
              <div
                className={`relative w-full h-44 bg-gradient-to-br ${tema.gradient} flex items-center justify-center overflow-hidden`}
              >
                <span className="font-heading text-xl text-white/90 drop-shadow-sm text-center px-4">
                  {tema.nama}
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium tracking-wide border border-white/70 rounded-full px-3 py-1">
                    Lihat Preview
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-brand-400">
                  {tema.kategori}
                </p>
                <h3 className="font-heading text-lg text-brand-700 mt-1">
                  {tema.nama}
                </h3>
                <p className="text-sm text-muted mt-2">{tema.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/undangan-digital"
            className="text-brand-700 font-medium hover:underline"
          >
            Lihat semua tema →
          </Link>
        </div>
      </section>

      <Divider />

      {/* Preview Testimoni */}
      {testimoniList && testimoniList.length > 0 && (
        <section className="max-w-6xl mx-auto py-16 px-8 pb-24">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-brand-400 text-center mb-2">
            Ruang Titip Pesan
          </p>
          <h2 className="font-heading text-3xl text-brand-700 text-center mb-12">
            Kata Mereka
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimoniList.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-brand-100 p-6 rounded-lg relative">
                <span className="font-heading text-5xl text-brand-400/50 leading-none absolute top-3 left-4">
                  "
                </span>
                <p className="text-sm text-ink leading-relaxed relative mt-6 italic">
                  {t.isi}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm font-semibold text-brand-700">
                    {t.nama}
                  </p>
                  <span className="text-brand-400 text-sm">
                    {"★".repeat(t.rating)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Beranda;
