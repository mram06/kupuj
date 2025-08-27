import { TopAdsItem } from "@/entities/top-ads/top-ads-item";
import styles from "./TopAdsPanel.module.css";

import houseImg from "@/assets/img/house.jpg";
import routerImg from "@/assets/img/router.jpg";
import glassesImg from "@/assets/img/glasses.jpg";
import tarasImg from "@/assets/img/taras.jpg";
import dogImg from "@/assets/img/dog.jpg";
import { OpenAdLinkButton } from "@/features/ads/open-button";

const data = [
  { id: 1, img: houseImg },
  { id: 2, img: routerImg },
  { id: 3, img: glassesImg },
  { id: 4, img: tarasImg },
  { id: 5, img: dogImg },
];

export const TopAdsPanel = () => {
  return (
    <div className={styles["items-container"]}>
      {data.map((ad) => (
        <TopAdsItem key={ad.id} item={ad}>
          <OpenAdLinkButton id={ad.id} />
        </TopAdsItem>
      ))}
    </div>
  );
};

export default TopAdsPanel;
