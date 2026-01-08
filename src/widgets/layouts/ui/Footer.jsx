import { AddLinkButton } from "@/features/ads/add-button/ui/AddLinkButton";
import { logout, useLogoutMutation } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import Profile from "./Profile";
import Menu from "./Navbar";

function Header() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const handleLogout = async () => {
    await logoutMutation();
    dispatch(logout());
  };

  return (
    <footer className="py-3.5 bg-gray-100 flex flex-col gap-6">
      <div className="container mx-auto flex items-center justify-center sm:justify-between flex-wrap gap-6">
        <Link path="/" className="text-3xl font-bold text-emerald-500">
          <span>Kupuj</span>!
        </Link>
        <div className="flex items-center justify-between gap-6">
          <Menu isAuthenticated={!!user} />
          {user && <Profile user={user} handleLogout={handleLogout} />}
          <AddLinkButton />
        </div>
      </div>
      <div className="flex justify-center">All rights reserved © 2025</div>
    </footer>
  );
}

export default Header;
