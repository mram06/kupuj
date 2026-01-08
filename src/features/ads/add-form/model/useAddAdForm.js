import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";

const defaultValues = {
  title: "",
  category: "",
  condition: "",
  price: "",
  photos: [],
  description: "",
  name: "",
  email: "",
  phone: "",
  city: "",
};

export const useAddAdForm = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
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

export default useAddAdForm;
