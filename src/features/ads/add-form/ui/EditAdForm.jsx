import { Dropdown } from "@/shared/ui/Dropdown";
import { Input } from "@/shared/ui/Input";
import styles from "./AddAdForm.module.css";
import { Textarea } from "@/shared/ui/Textarea";
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { PhotoSection } from "./PhotoSection";
import { useUpdateMutation } from "../../api/advertsApi";
import { citiesList } from "@/widgets/ads/FilterPanel";
import { useGetCategoriesQuery } from "@/features/categories/api/categoriesApi";
import { useNavigate } from "react-router";
import useEditAdForm from "../model/useEditAdForm";

export const EditAdForm = ({ adData, setMessage }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    field: { errors },
    setValue,
    watch,
    formState: { isSubmitting, isValid },
  } = useEditAdForm(adData);

  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  // Завантажити існуючі фото при завантаженні компонента
  useEffect(() => {
    if (adData?.photos && Array.isArray(adData.photos)) {
      setExistingPhotos(adData.photos);
    }
  }, [adData]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, 5 - existingPhotos.length);
    setPhotos(newPhotos);
    setValue("photos", newPhotos, { shouldValidate: true });
  };

  const removePhoto = (index, isExisting = false) => {
    if (isExisting) {
      const newExistingPhotos = existingPhotos.filter((_, i) => i !== index);
      setExistingPhotos(newExistingPhotos);
    } else {
      const newPhotos = photos.filter((_, i) => i !== index);
      setPhotos(newPhotos);
      setValue("photos", newPhotos, { shouldValidate: true });
    }
  };

  const [updateAd, { isLoading }] = useUpdateMutation();
  const { data: categoriesList } = useGetCategoriesQuery();
  const categoryValue = watch("category");
  const conditionValue = watch("condition");
  const cityValue = watch("city");

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

    // Add existing photos that are kept
    if (existingPhotos && existingPhotos.length > 0) {
      existingPhotos.forEach((photo) => {
        formData.append("existingPhotos", photo);
      });
    }

    // Add new photos
    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        formData.append("newPhotos", photo);
      });
    }

    try {
      await updateAd({ id: adData.id, data: formData }).unwrap();
      setMessage("Оголошення успішно оновлено");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

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
          value={categoryValue}
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
          value={conditionValue}
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
        existingPhotos={existingPhotos}
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
          placeholder="Ім'я та прізвище"
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
          value={cityValue}
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
          disabled={isSubmitting || isLoading}
          type="submit"
          isLoading={isLoading}
        >
          Зберегти зміни
        </Button>
      </div>
    </form>
  );
};
