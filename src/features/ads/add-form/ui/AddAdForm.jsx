import { Dropdown } from "@/shared/ui/Dropdown";
import { Input } from "@/shared/ui/Input";
import styles from "./AddAdForm.module.css";
import { Textarea } from "@/shared/ui/Textarea";
import useAddAdForm from "../model/useAddAdForm";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { PhotoSection } from "./PhotoSection";
import { useCreateMutation } from "../../api/advertsApi";
import { citiesList } from "@/widgets/ads/FilterPanel";
import { useGetCategoriesQuery } from "@/features/categories/api/categoriesApi";
import { useNavigate } from "react-router";

export const AddAdForm = ({ setMessage }) => {
  const {
    register,
    handleSubmit,
    field: { errors },
    setValue,
    reset,
    formState: { isSubmitting, isValid },
  } = useAddAdForm();

  const [photos, setPhotos] = useState([]);
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, 5);
    setPhotos(newPhotos);
    setValue("photos", newPhotos, { shouldValidate: true });
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setValue("photos", newPhotos, { shouldValidate: true });
  };

  const [createAd, { isLoading, isError, error }] = useCreateMutation();
  const {
    data: categoriesList,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  const submit = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("condition", values.condition);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("city", values.city);

    if (values.photos && values.photos.length > 0) {
      values.photos.forEach((photo) => {
        formData.append("photos", photo);
      });
    }

    await createAd(formData).unwrap();
    reset();
    setPhotos([]);
    setMessage(
      "Оголошення успішно створено. Ви можете знайти його у списку оголошень у профілі"
    );
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
      <section className={styles.section}>
        <h2 className="subtitle">Опишіть у подробицях</h2>
        <Input
          secondary
          placeholder="Наприклад, роутер TP Link"
          error={errors.title?.message}
          errorPosition="top"
          {...register("title")}
        />
        <Dropdown
          secondary
          title="Виберіть категорію"
          options={categoriesList?.map((category) => ({
            value: category.id,
            label: category.title,
          }))}
          error={errors.category?.message}
          errorPosition="top"
          {...register("category")}
        />
        <Dropdown
          secondary
          title="Оберіть стан товару, що продаєте"
          options={[
            { value: "new", label: "Нове" },
            { value: "used", label: "Вживане" },
          ]}
          error={errors.condition?.message}
          errorPosition="top"
          {...register("condition")}
        />
        <Input
          secondary
          placeholder="Наприклад, 2000 грн"
          error={errors.price?.message}
          errorPosition="top"
          {...register("price")}
        />
      </section>

      <PhotoSection
        photos={photos}
        errors={errors}
        handlePhotoChange={handlePhotoChange}
        removePhoto={removePhoto}
      />

      <section className={styles.section}>
        <h2 className="subtitle">Опис</h2>
        <Textarea
          secondary
          placeholder="Опишіть, що будете продавати"
          error={errors.description?.message}
          errorPosition="top"
          {...register("description")}
        />
      </section>

      <section className={styles.section}>
        <h2 className="subtitle">Контактні дані</h2>
        <Input
          secondary
          placeholder="Ім’я та прізвище"
          error={errors.name?.message}
          errorPosition="top"
          {...register("name")}
        />
        <Input
          secondary
          placeholder="Електронна адреса"
          error={errors.email?.message}
          errorPosition="top"
          {...register("email")}
        />
        <Input
          secondary
          placeholder="+38 0"
          error={errors.phone?.message}
          errorPosition="top"
          {...register("phone")}
        />
        <Dropdown
          secondary
          title="Обрати місто"
          options={citiesList}
          error={errors.city?.message}
          errorPosition="top"
          {...register("city")}
        />
      </section>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        <Button white type="button" onClick={() => navigate(-1)}>
          Скасувати
        </Button>
        <Button
          disabled={isSubmitting || isLoading || !isValid}
          type="submit"
          isLoading={isLoading}
        >
          Опублікувати
        </Button>
      </div>
    </form>
  );
};
