// frontend/src/pages/demo/DarkLuxuryNoir/components/FloatingNav.tsx
import type { ReactElement } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: ReactElement;
};

const iconClass = "w-5 h-5";

const navItems: NavItem[] = [
  {
    id: "mempelai",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 10v9h13v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "acara",
    label: "Acara",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "galeri",
    label: "Galeri",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4.5 17 4.8-4.8a1.5 1.5 0 0 1 2.1 0L17 17.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <path d="M4 6.5 12 12l8-5.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="6.5" width="16" height="11" rx="2" />
      </svg>
    ),
  },
  {
    id: "amplop",
    label: "Kado",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <rect x="4" y="9" width="16" height="11" rx="2" />
        <path d="M4 9h16M12 9v11M8 9c-1.4 0-2.5-1.1-2.5-2.5S6.6 4 8 4c2.2 0 4 5 4 5s1.8-5 4-5c1.4 0 2.5 1.1 2.5 2.5S17.4 9 16 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function FloatingNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-[#1a1a1a]/80 backdrop-blur-md border border-[#2e2e2e] rounded-full px-2 py-2 shadow-lg shadow-[#d4af6a]/10">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToId(item.id)}
          className="flex flex-col items-center justify-center w-14 py-1.5 rounded-full text-[#b0a894] hover:text-[#d4af6a] hover:bg-[#1a1a1a] transition-colors"
        >
          {item.icon}
          <span className="text-[9px] mt-0.5 tracking-wide">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default FloatingNav;
