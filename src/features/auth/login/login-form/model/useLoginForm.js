import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";

const defaultValues = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const form = useForm({
    mode: "onBlur",
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

export default useLoginForm;
