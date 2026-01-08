import { AdItemWithActions } from "@/features/ads/ad-item";
import { useGetFavoritesQuery } from "@/features/ads/api/advertsApi";
import linkImages from "@/shared/api/linkImages";
import { Error, NotFound } from "@/shared/ui/Notifications";

export const FavoritesSection = () => {
  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    error: favoritesError,
  } = useGetFavoritesQuery();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Обрані оголошення</h2>
      <div className="flex flex-col gap-6">
        {favoritesLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        )}

        {favoritesData && favoritesData.length > 0
          ? linkImages(favoritesData).map((ad) => (
              <AdItemWithActions key={ad.id} data={ad} />
            ))
          : !favoritesLoading && <NotFound />}

        {favoritesError && <Error />}
      </div>
    </div>
  );
};
