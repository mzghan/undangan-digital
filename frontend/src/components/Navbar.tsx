import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/undangan-digital", label: "Undangan Digital" },
  { to: "/wedding-planner", label: "Wedding Planner" },
  { to: "/portofolio", label: "Portofolio" },
  { to: "/testimoni", label: "Testimoni" },
  { to: "/aksara-hashtag", label: "Aksara Hashtag" },
];

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-brand-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="font-heading text-xl font-semibold text-brand-700 italic">
            Undangan Digital
          </span>

          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `font-body px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-100 text-brand-700"
                      : "text-muted hover:bg-brand-50 hover:text-brand-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
