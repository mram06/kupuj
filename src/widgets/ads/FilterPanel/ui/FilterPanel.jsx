import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";
import { Input } from "@/shared/ui/Input";
import { citiesList } from "../model/citiesList";
import { categories } from "@/widgets/Categories-row/settings";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const FilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams = Object.fromEntries(searchParams);

  const [searchQuery, setSearchQuery] = useState(allSearchParams);

  const setSearchFilters = (e) => {
    setSearchQuery((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  const onSetQuery = () => {
    setSearchParams(searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery({});
    setSearchParams({});
  };

  useEffect(() => {
    setSearchParams(allSearchParams);

    return () => {
      setSearchParams({});
    };
  }, []);

  return (
    <section className="mt-12">
      <div className="container">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:grid sm:grid-cols-[2.5fr_1fr_0.5fr] items-stretch sm:items-center gap-2">
            <Input
              placeholder="Що шукаєте?"
              name="search"
              value={searchQuery.search}
              onChange={(e) => setSearchFilters(e)}
            />
            <Dropdown
              title="Обрати місто"
              options={citiesList}
              name="city"
              value={searchQuery.city}
              onChange={(e) => setSearchFilters(e)}
            />
            <Button onClick={onSetQuery}>Пошук</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Dropdown
              label="Категорія"
              title="Обрати категорію"
              options={categories.map((category) => ({
                value: category.id,
                label: category.title,
              }))}
              name="category"
              value={searchQuery.category}
              onChange={(e) => setSearchFilters(e)}
            />

            <div className="flex gap-2 items-end">
              <Input
                label="Ціна"
                placeholder="Від:"
                type="number"
                name="priceMin"
                value={searchQuery.priceMin}
                onChange={(e) => setSearchFilters(e)}
              />
              <Input
                placeholder="До:"
                type="number"
                name="priceMax"
                value={searchQuery.priceMax}
                onChange={(e) => setSearchFilters(e)}
              />
            </div>
            <Dropdown
              label="Стан"
              title="Не обрано"
              options={[
                { value: "new", label: "Нове" },
                { value: "used", label: "Вживане" },
              ]}
              name="condition"
              value={searchQuery.condition}
              onChange={(e) => setSearchFilters(e)}
            />
            <Dropdown
              label="Сортування"
              title="За релевантністю"
              options={[
                { value: "asc", label: "Ціна за зростанням" },
                { value: "desc", label: "Ціна за спаданням" },
              ]}
              name="sort"
              value={searchQuery.sort}
              onChange={(e) => setSearchFilters(e)}
            />
          </div>
        </div>
        <button
          className="mt-4 sm:mt-6 underline cursor-pointer text-sm sm:text-base"
          onClick={clearFilters}
        >
          Очистити фільтри
        </button>
      </div>
    </section>
  );
};
