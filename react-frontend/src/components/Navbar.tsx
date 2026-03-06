import { useState } from "react";
import { Link, NavLink } from "react-router";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/cart", label: "Cart" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-skate-bg/95 backdrop-blur">
      <div className="mx-auto font-title flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm uppercase tracking-[0.2em]">
          NO COMPLY
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out ${
                  isActive ? "text-skate-acid" : "hover:text-skate-acid"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-sm border border-skate-text/60 px-3 py-2 text-xs font-bold uppercase text-skate-text md:hidden"
          aria-label="Toggle mobile menu"
        >
          Menu
        </button>
      </div>

      {isOpen && (
        <nav className="space-y-2 border-t border-white/10 px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out ${
                  isActive
                    ? "text-skate-acid"
                    : "text-skate-text hover:text-skate-acid"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
