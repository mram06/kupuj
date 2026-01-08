import styles from "./AddAdForm.module.css";
import imgIcon from "@/assets/icons/images.svg";
import linkImage from "@/shared/api/linkImage";

export const PhotoSection = ({
  photos,
  existingPhotos = [],
  errors,
  handlePhotoChange,
  removePhoto,
}) => {
  const totalPhotos = existingPhotos.length + photos.length;

  return (
    <section className={styles.section}>
      <h2 className="subtitle">Фото</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(4,164px)] auto-rows-[100px] sm:auto-rows-[130px] lg:auto-rows-[164px] gap-3 sm:gap-4 lg:gap-6">
        {/* Existing photos */}
        {existingPhotos.map((photo, i) => (
          <div
            key={`existing-${i}`}
            className={`relative grid grid-cols-3 bg-white rounded-2xl overflow-hidden ${
              i === 0 ? "row-span-2 col-span-2" : ""
            }`}
          >
            <img
              src={linkImage(photo)}
              className="w-full h-full object-cover col-span-3"
              alt={`Existing photo ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removePhoto(i, true)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
            >
              ×
            </button>
          </div>
        ))}

        {/* New photos */}
        {photos.map((photo, i) => (
          <div
            key={`new-${i}`}
            className={`relative grid grid-cols-3 bg-white rounded-2xl overflow-hidden ${
              existingPhotos.length + i === 0 ? "row-span-2 col-span-2" : ""
            }`}
          >
            <img
              src={URL.createObjectURL(photo)}
              className="w-full h-full object-cover col-span-3"
              alt={`Preview ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removePhoto(i, false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
            >
              ×
            </button>
          </div>
        ))}

        {/* Buttons for add photos */}
        {[...Array(5)].map(
          (_, i) =>
            totalPhotos < i + 1 && (
              <label
                key={`add-${i}`}
                className={`relative grid grid-cols-3 bg-white rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-50
                      ${i === 0 ? "row-span-2 col-span-2" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <img src={imgIcon} className="w-full h-full col-start-2" />
              </label>
            )
        )}
      </div>
      {errors.photos && (
        <p className="text-red-500 text-sm mt-2">{errors.photos.message}</p>
      )}
    </section>
  );
};
