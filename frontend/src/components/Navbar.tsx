import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/undangan-digital', label: 'Undangan Digital' },
  { to: '/wedding-planner', label: 'Wedding Planner' },
  // { to: '/portofolio', label: 'Portofolio' },
  { to: '/testimoni', label: 'Testimoni' },
  { to: '/aksara-hashtag', label: 'Aksara Hashtag' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menutup menu mobile saat link diklik
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-brand-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <span className="font-heading text-xl font-semibold text-brand-700 italic">Undangan Digital</span>

          {/* Tombol Hamburger (Hanya Tampil di Mobile) */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" aria-label="Toggle Menu" className="p-2 rounded-md text-brand-700 hover:bg-brand-50 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  // Icon X (Close)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Icon Hamburger
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Navigasi Desktop (Tampil di md ke atas) */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `font-body px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-brand-100 text-brand-700' : 'text-muted hover:bg-brand-50 hover:text-brand-700'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Navigasi Mobile (Dropdown saat hamburger diklik) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={handleLinkClick}
              className={({ isActive }) => `block font-body px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-brand-100 text-brand-700' : 'text-muted hover:bg-brand-50 hover:text-brand-700'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
