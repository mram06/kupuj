import { CategoryLinkButton } from "@/features/categories/category-link-button";
import { categories } from "../settings";
import { CategoryListDropdown } from "@/features/categories/category-list-dropdown";

export const CategoriesRow = () => {
  return (
    <div className="flex justify-between items-center gap-6 flex-wrap mt-6">
      {categories.map((category) => (
        <CategoryLinkButton key={category.id} id={category.id}>
          {category.title}
        </CategoryLinkButton>
      ))}
      <CategoryListDropdown />
    </div>
  );
};
