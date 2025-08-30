import * as yup from "yup";

export const schema = yup.object({
  resetCode: yup
    .string()
    .required("Код обов'язковий")
    .length(6, "Код повинен містити 6 цифр"),
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
});
