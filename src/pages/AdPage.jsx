import { useGetAdvertByIdQuery } from "@/features/ads/api/advertsApi";
import { Banner } from "@/shared/ui/Banner";
import { useParams } from "react-router";
import { useState } from "react";
import { AddToFavoritesButton } from "@/features/ads/add-to-favorites-button";
import { Button } from "@/shared/ui/Button";
import { AdGallery } from "@/entities/ads/ad-gallery";

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function AdPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetAdvertByIdQuery({
    id,
  });

  const [showPhone, setShowPhone] = useState(false);

  return (
    <>
      <Banner />
      <div className="container">
        <div className="pt-4 sm:pt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 auto-rows-max">
          {/* Gallery */}
          <div className="sm:row-span-2">
            <AdGallery photos={data?.photos} />
          </div>

          {/* Description */}
          <section className="p-4 sm:p-6 bg-gray-100 rounded-3xl">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div className="text-xs sm:text-sm font-medium text-gray-500">
                <p>
                  {new Date(data?.created_at + "Z").toLocaleString("uk-UA", {
                    timeZone: "Europe/Kyiv",
                  })}
                </p>
                <p className="mt-2">{data?.city}</p>
              </div>

              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <div className="w-10 sm:w-12 h-10 sm:h-12 justify-center flex items-center bg-gray-100 rounded-full border border-gray-200 flex-shrink-0"></div>
                <div className="min-w-0">
                  {data?.name} {data?.lastname}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-start sm:items-center justify-between gap-4 mt-6 sm:mt-10">
              <div className="text-2xl sm:text-3xl font-medium">
                {data?.title}
              </div>
              <div className="flex-shrink-0">
                <AddToFavoritesButton id={data?.id} />
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-bold mt-4">
              {data?.price} грн
            </div>

            {/* Condition */}
            {data?.ad_condition && (
              <div className="mt-6 sm:mt-12 font-medium px-4 sm:px-6 py-2 rounded-2xl bg-emerald-200 inline-block text-sm sm:text-base">
                {data.ad_condition === "new" ? "Нове" : "Вживане"}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 sm:mt-12 flex flex-col lg:flex-row gap-3 sm:gap-6">
              <Button white>Повідомлення</Button>
              <Button white onClick={() => setShowPhone(true)}>
                {showPhone ? data?.phone : "Показати телефон"}
              </Button>
            </div>
          </section>

          {/* About */}
          <section className="p-4 sm:p-6 bg-gray-100 rounded-3xl">
            <div className="text-2xl sm:text-3xl font-bold">Опис</div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base">
              {decodeHTML(data?.description)}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdPage;
