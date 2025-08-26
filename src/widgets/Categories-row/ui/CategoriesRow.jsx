import { CategoryLinkButton } from "@/features/categories/category-link-button";

export const CategoriesRow = () => {
  return (
    <div className="flex justify-between items-center gap-6 flex-wrap mt-6">
      <CategoryLinkButton>Одяг</CategoryLinkButton>
      <CategoryLinkButton>Одяг</CategoryLinkButton>
      <CategoryLinkButton>Взуття</CategoryLinkButton>
      <CategoryLinkButton>Електроніка</CategoryLinkButton>
      <CategoryLinkButton>Прикраси</CategoryLinkButton>
      <CategoryLinkButton>Дім</CategoryLinkButton>
      <CategoryLinkButton>Тварини</CategoryLinkButton>
      <CategoryLinkButton>Авто</CategoryLinkButton>
      <CategoryLinkButton>Безкоштовно</CategoryLinkButton>
      <CategoryLinkButton>Оренда</CategoryLinkButton>
      <CategoryLinkButton>Сад</CategoryLinkButton>
      <CategoryLinkButton>...</CategoryLinkButton>
    </div>
  );
};
