// frontend/src/pages/demo/KoranLama/components/FloatingNav.tsx
type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: "mempelai", label: "Berita" },
  { id: "acara", label: "Agenda" },
  { id: "galeri", label: "Foto" },
  { id: "rsvp", label: "Konfirmasi" },
  { id: "amplop", label: "Kado" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function FloatingNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0 bg-[#f4ecd8] border-2 border-[#2b2620] rounded-sm px-1 py-1 shadow-lg shadow-black/20">
      {navItems.map((item, i) => (
        <button
          key={item.id}
          onClick={() => scrollToId(item.id)}
          className={`px-3 py-2 text-[10px] uppercase tracking-wider text-[#2b2620] font-serif hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors ${
            i !== navItems.length - 1 ? "border-r border-[#2b2620]/40" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default FloatingNav;
