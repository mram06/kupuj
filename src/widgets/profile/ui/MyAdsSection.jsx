import { AdItemWithOwnerActions } from "@/features/ads/ad-item";
import { useGetAdvertsByUserIdQuery } from "@/features/ads/api/advertsApi";
import { selectAuthUser } from "@/features/auth";
import linkImages from "@/shared/api/linkImages";
import { Error } from "@/shared/ui/Notifications";
import { useSelector } from "react-redux";

export const MyAdsSection = () => {
  const user = useSelector(selectAuthUser);

  const {
    data: userAdverts,
    isLoading: isUserAdvertsLoading,
    error: userAdvertsError,
  } = useGetAdvertsByUserIdQuery({ id: user?.id }, { skip: !user });

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Будь ласка, увійдіть в акаунт</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Мої оголошення</h2>
      <div className="flex flex-col gap-6">
        {isUserAdvertsLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        )}

        {userAdverts?.data &&
          !isUserAdvertsLoading &&
          userAdverts.data.length > 0 &&
          linkImages(userAdverts.data).map((advert) => (
            <AdItemWithOwnerActions data={advert} key={advert.id} />
          ))}

        {userAdverts?.data &&
          !isUserAdvertsLoading &&
          userAdverts.data.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-lg font-medium">
                Немає оголошень
              </p>
              <p className="text-gray-500 mt-2">
                Почніть з створення першого оголошення
              </p>
            </div>
          )}

        {userAdvertsError && <Error />}
      </div>
    </div>
  );
};
