import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schema } from "./validation";

// Schema for edit mode - makes photos optional if there are existing photos
const editSchema = schema.clone().shape({
  photos: yup
    .array()
    .min(0, "")
    .max(5, "Максимум 5 фото")
    .of(
      yup
        .mixed()
        .test("fileSize", "Файл завеликий (макс 5MB)", (value) => {
          return value && value.size <= 5242880;
        })
        .test("fileType", "Непідтримуваний формат", (value) => {
          return (
            value &&
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              value.type
            )
          );
        })
    ),
});

export const useEditAdForm = (defaultValues) => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title || "",
      category: defaultValues?.category_id || "",
      condition: defaultValues?.ad_condition || "",
      price: defaultValues?.price || "",
      photos: [],
      description: defaultValues?.description || "",
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      city: defaultValues?.city || "",
    },
    resolver: yupResolver(editSchema),
  });

  const field = useMemo(
    () => ({
      Controller,
      errors: form.formState.errors,
    }),
    [form.formState.errors]
  );

  return { ...form, field };
};

export default useEditAdForm;
