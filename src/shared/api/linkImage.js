export default function linkImage(image) {
  return `${import.meta.env.VITE_BASE_API}uploads/${image}`;
}
