import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("Невірний формат email")
    .required("* Введіть адресу електронної пошти"),
  password: yup.string().required("* Введіть пароль"),
});
