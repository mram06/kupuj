import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("* Введіть ім'я").min(2, "Мінімум 2 символи"),
  email: yup
    .string()
    .email("Невірний формат email")
    .required("* Введіть адресу електронної пошти"),
  password: yup
    .string()
    .min(8, "Мінімум 8 символів")
    .matches(/[A-Z]/, "Має містити велику літеру")
    .matches(/[a-z]/, "Має містити малу літеру")
    .matches(/[0-9]/, "Має містити цифру")
    // .matches(/[^A-Za-z0-9]/, "Має містити спецсимвол")
    .required("* Введіть пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі не співпадають")
    .required("* Підтвердіть пароль"),
  phone: yup
    .string()
    .nullable()
    .required("* Введіть номер телефону")
    .matches(/^(\+?\d{10,15})?$/, "Некоректний телефон"),
});
