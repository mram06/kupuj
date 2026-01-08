export default function linkImages(list) {
  return list.map((item) => ({
    ...item,
    photos: item?.photos?.map(
      (photo) => `${import.meta.env.VITE_BASE_API}uploads/${photo}`
    ),
  }));
}
