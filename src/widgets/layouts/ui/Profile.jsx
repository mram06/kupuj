import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

function Profile({ user }) {
  const getUsersFirstLetters = () => {
    if (user?.name && user?.lastName) return user.name[0] + user.lastName[0];
    else if (user?.name) return user.name[0];
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(frontRoutes.pages.ProfilePage.navigationPath);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-12 h-12 justify-center flex items-center bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
      >
        {getUsersFirstLetters()}
      </div>
    </>
  );
}

export default Profile;
