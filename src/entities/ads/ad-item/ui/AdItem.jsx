import noPhotoIcon from "@/assets/img/no-image.png";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useState } from "react";
import { useNavigate } from "react-router";

export const AdItem = ({
  data: { id, title, price, ad_condition, city, photos = [], created_at = "" },
  children,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(frontRoutes.pages.AdPage.navigationPath(id));
  };

  return (
    <article
      onClick={handleClick}
      className="bg-gray-100 rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer"
    >
      <div className="w-full sm:w-84 h-40 sm:h-56 flex-shrink-0 rounded-2xl overflow-hidden flex justify-center items-center">
        {photos.length ? (
          <>
            {!imageLoaded && (
              <div className="absolute w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
            )}
            <img
              src={photos[0]}
              loading="lazy"
              className={`w-full h-full object-cover ${
                !imageLoaded ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <img src={noPhotoIcon} alt="No photo" className=" w-1/5 opacity-50" />
        )}
      </div>

      <div className="flex-auto flex flex-col min-w-0">
        <div className="text-lg sm:text-2xl flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between">
          <div className="font-medium truncate min-w-0">{title}</div>
          <div className="font-bold flex-shrink-0">{price} грн</div>
        </div>

        {ad_condition && (
          <div className="mt-3 sm:mt-4 font-medium px-4 sm:px-6 py-2 rounded-2xl bg-emerald-200 self-start text-sm">
            {ad_condition === "new" ? "Нове" : "Вживане"}
          </div>
        )}

        <div className="mt-3 sm:mt-auto flex items-center justify-between text-xs text-gray-500 gap-2 sm:gap-0">
          <div>
            <p>
              {new Date(created_at + "Z").toLocaleString("uk-UA", {
                timeZone: "Europe/Kyiv",
              })}
            </p>
            <p>{city}</p>
          </div>
          <div className="self-end sm:self-auto">{children}</div>
        </div>
      </div>
    </article>
  );
};
