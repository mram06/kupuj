import { useState, useRef, useEffect } from "react";
import { categories } from "@/widgets/Categories-row/settings";
import { useNavigate } from "react-router";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export const CategoryListDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleLink = (categoryId) => {
    navigate(frontRoutes.pages.AdsPage.navigationPath(categoryId));
    setIsOpen(false); // Закриваємо дропдаун після вибору категорії
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="py-4 px-6 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-200 transition-colors duration-200"
        onClick={handleToggle}
      >
        <span>⋯</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              Вибрати категорію
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <button
                onClick={() => handleLink(category.id)}
                key={category.id}
                className="w-full text-left px-4 py-3 text-sm hover:bg-emerald-100 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
