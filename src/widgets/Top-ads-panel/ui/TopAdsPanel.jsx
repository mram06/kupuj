import {
  TopAdsItem,
  TopAdsItemSkeleton,
} from "@/entities/top-ads/top-ads-item";
import styles from "./TopAdsPanel.module.css";

import { OpenAdLinkButton } from "@/features/ads/open-button";
import { useGetTopAdvertsQuery } from "@/features/ads/api/advertsApi";
import linkImages from "@/shared/api/linkImages";
import { Error } from "@/shared/ui/Notifications";

export const TopAdsPanel = () => {
  const { data, isLoading, error } = useGetTopAdvertsQuery();

  return (
    <div className={styles["items-container"]}>
      {!isLoading &&
        !error &&
        linkImages(data)?.map((ad) => (
          <TopAdsItem key={ad.id} item={ad}>
            <OpenAdLinkButton id={ad.id} />
          </TopAdsItem>
        ))}
      {isLoading &&
        [1, 2, 3, 4, 5].map((item, index) => (
          <TopAdsItemSkeleton key={index} />
        ))}
      {error && <Error />}
    </div>
  );
};

export default TopAdsPanel;
