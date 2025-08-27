import { AddLinkButton } from "@/features/ads/add-button/ui/AddLinkButton";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="px-7 py-3.5">
      <div className="container mx-auto flex items-center justify-between">
        <Link path="/" className="text-3xl font-bold text-emerald-500">
          <span>Kupuj</span>!
        </Link>
        <div className="w-120 flex items-center justify-between">
          <nav>
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
            </ul>
          </nav>
          <AddLinkButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
