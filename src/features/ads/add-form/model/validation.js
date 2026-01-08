import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("* Вкажіть назву"),
  category: yup.string().required("* Категорія"),
  condition: yup.string(),
  price: yup.number().min(0).required("* Вкажіть ціну"),
  description: yup
    .string()
    .min(30, "Опис має бути хоча б 30 знаків")
    .max(1000, "Опис завеликий")
    .required("* Вкажіть опис"),
  name: yup.string().required("* Контактна особа"),
  email: yup
    .string()
    .email("Невірний формат email")
    .required("* Введіть адресу електронної пошти"),
  phone: yup.string().required("* Номер телефону"),
  city: yup.string().required("* Місцезнаходження"),

  photos: yup
    .array()
    .min(1, "Додайте хоча б одне фото")
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
