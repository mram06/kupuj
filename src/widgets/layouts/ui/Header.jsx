import { AddLinkButton } from "@/features/ads/add-button/ui/AddLinkButton";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import Profile from "./Profile";
import Menu from "./Navbar";
import BurgerMenu from "./BurgerMenu";

function Header() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="py-3.5 relative">
      <div className="container mx-auto flex items-center justify-between">
        <Link path="/" className="text-3xl font-bold text-emerald-500">
          <span>Kupuj</span>!
        </Link>
        <div className="flex items-center justify-between gap-6">
          <Menu isAuthenticated={!!user} />
          {user && <Profile user={user} />}

          <div className="sm:block hidden">
            <AddLinkButton />
          </div>
          <BurgerMenu isAuthenticated={!!user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
