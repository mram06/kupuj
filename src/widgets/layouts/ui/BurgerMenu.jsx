import { useState } from "react";
import { NavLink } from "react-router";

function BurgerMenu({ isAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1.5 focus:outline-none z-50 relative"
        aria-label="Меню"
      >
        <span
          className={`block w-6 h-0.5  transition-all duration-300 ${
            isOpen ? "-rotate-45 translate-y-2 bg-black" : "bg-emerald-500"
          }`}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? "opacity-0 bg-black" : "bg-emerald-500"
          }`}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? "rotate-45 -translate-y-2 bg-black" : "bg-emerald-500"
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-emerald-900/45 bg-opacity-0 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu*/}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="py-6 px-4">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-500 font-semibold block px-4 py-3 rounded"
                    : "hover:text-emerald-500 transition-colors block px-4 py-3 rounded hover:bg-gray-100"
                }
                onClick={closeMenu}
              >
                Головна
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-500 font-semibold block px-4 py-3 rounded"
                    : "hover:text-emerald-500 transition-colors block px-4 py-3 rounded hover:bg-gray-100"
                }
                onClick={closeMenu}
              >
                Про нас
              </NavLink>
            </li>
            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-500 font-semibold block px-4 py-3 rounded"
                      : "hover:text-emerald-500 transition-colors block px-4 py-3 rounded hover:bg-gray-100"
                  }
                  onClick={closeMenu}
                >
                  Профіль
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default BurgerMenu;
