import { selectAuthUser } from "@/features/auth";
import { ProfileEditForm } from "@/widgets/auth/ProfileEditForm";
import { useSelector } from "react-redux";

export const SettingsSection = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Налаштування профілю</h2>
      <ProfileEditForm user={user} />
    </div>
  );
};
