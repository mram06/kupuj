import React, { useState, useEffect } from "react";
import linkImage from "@/shared/api/linkImage";

export const AdGallery = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  // Стан для головного зображення
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  // Стан для мініатюр (масив)
  const [thumbsLoaded, setThumbsLoaded] = useState(() =>
    photos ? Array(photos.length).fill(false) : []
  );

  useEffect(() => {
    setThumbsLoaded(photos ? Array(photos.length).fill(false) : []);
  }, [photos]);

  return (
    <section className="p-6 bg-gray-100 rounded-3xl">
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="w-full h-140 bg-white rounded-2xl overflow-hidden flex justify-center items-center relative">
          {photos && photos.length > 0 && (
            <>
              {!mainImageLoaded && (
                <div className="absolute w-12 h-12 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin z-10"></div>
              )}
              <img
                src={linkImage(photos[selectedImage])}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  mainImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setMainImageLoaded(true)}
                alt="ad main"
              />
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3 max-w-100 m-auto">
          {photos?.map((photo, index) => (
            <button
              key={index}
              onClick={() => {
                if (selectedImage === index) {
                  // Якщо клік на вже обране фото, не скидаємо стан
                  return;
                }
                setSelectedImage(index);
                setMainImageLoaded(false); // Скидаємо стан завантаження головного зображення
              }}
              className={`max-w-22 max-h-22 bg-white rounded-2xl border-2 transition-all ${
                selectedImage === index
                  ? "border-emerald-500 scale-105"
                  : "border-transparent hover:border-gray-300"
              } relative flex justify-center items-center`}
            >
              {!thumbsLoaded[index] && (
                <div className="absolute w-6 h-6 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin z-10"></div>
              )}
              <img
                src={linkImage(photo)}
                className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                  thumbsLoaded[index] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() =>
                  setThumbsLoaded((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  })
                }
                alt={`ad thumb ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
