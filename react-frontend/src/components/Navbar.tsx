import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

const baseNavItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/cart", label: "Cart" },
  { to: "/account", label: "Account" },
];

const authNavItems = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

const MOCK_SESSION_KEY = "mockSession";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = (() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const rawSession = localStorage.getItem(MOCK_SESSION_KEY);
      if (!rawSession) {
        return false;
      }

      const session = JSON.parse(rawSession) as { loggedIn?: boolean };
      return session.loggedIn === true;
    } catch {
      return false;
    }
  })();

  const navItems = isLoggedIn
    ? baseNavItems
    : [...baseNavItems, ...authNavItems];

  const handleLogout = () => {
    localStorage.removeItem(MOCK_SESSION_KEY);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bgPrimary/95 backdrop-blur">
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
                  isActive ? "text-acid" : "hover:text-acid"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out hover:text-acid"
            >
              Logout
            </button>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-sm border border-textPrimary/60 px-3 py-2 text-xs font-bold uppercase text-textPrimary md:hidden"
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
                  isActive ? "text-acid" : "text-textPrimary hover:text-acid"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full text-left text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out text-textPrimary hover:text-acid"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
