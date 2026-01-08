import { NavLink } from "react-router";

function Menu({ isAuthenticated }) {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-500"
                : "hover:text-emerald-500 transition-colors"
            }
          >
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-500"
                : "hover:text-emerald-500 transition-colors"
            }
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
                  ? "text-emerald-500"
                  : "hover:text-emerald-500 transition-colors"
              }
            >
              Профіль
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
