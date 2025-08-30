import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { NavLink } from "react-router";

export const LoginTypeToggle = () => {
  return (
    <div className="grid grid-cols-2 bg-gray-100 mb-12 rounded-2xl">
      <NavLink
        to={frontRoutes.pages.LoginPage.navigationPath}
        className={({ isActive }) =>
          `${
            isActive ? "bg-emerald-500 text-white" : "hover:bg-emerald-100"
          } py-3.5 px-6 rounded-2xl text-center font-bold transition-colors cursor-pointer`
        }
      >
        Вхід
      </NavLink>
      <NavLink
        to={frontRoutes.pages.SignupPage.navigationPath}
        className={({ isActive }) =>
          `${
            isActive ? "bg-emerald-500 text-white" : "hover:bg-emerald-100"
          } py-3.5 px-6 rounded-2xl text-center font-bold transition-colors cursor-pointer`
        }
      >
        Реєстрація
      </NavLink>
    </div>
  );
};
