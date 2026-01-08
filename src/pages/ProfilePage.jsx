import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { LogoutButton } from "@/features/auth/logout-button";
import {
  FavoritesSection,
  MyAdsSection,
  SettingsSection,
} from "@/widgets/profile";

function ProfilePage() {
  const user = useSelector(selectAuthUser);
  const [activeTab, setActiveTab] = useState("ads"); // 'ads', 'favorites', 'settings'

  const tabClasses = (isActive) =>
    `px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm md:text-base font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
      isActive
        ? "border-emerald-500 text-emerald-600"
        : "border-transparent text-gray-600 hover:text-gray-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        {/* User Info Header */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                {user?.name} {user?.lastName}
              </h1>
              <p className="text-gray-600 mt-2">{user?.email}</p>
              {user?.phone && (
                <p className="text-gray-600 mt-1">{user?.phone}</p>
              )}
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-3xl border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-min sm:min-w-0">
            <button
              onClick={() => setActiveTab("ads")}
              className={tabClasses(activeTab === "ads")}
            >
              Мої оголошення
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={tabClasses(activeTab === "favorites")}
            >
              Обрані
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={tabClasses(activeTab === "settings")}
            >
              Налаштування профілю
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-3xl p-8">
          {activeTab === "ads" && <MyAdsSection />}
          {activeTab === "favorites" && <FavoritesSection />}
          {activeTab === "settings" && <SettingsSection />}{" "}
          {/* Make profile change */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
