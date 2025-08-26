import { TopAdsItem } from "@/entities/top-ads/top-ads-item";
import styles from "./TopAdsPanel.module.css";

import houseImg from "@/assets/img/house.jpg";
import routerImg from "@/assets/img/router.jpg";
import glassesImg from "@/assets/img/glasses.jpg";
import tarasImg from "@/assets/img/taras.jpg";
import dogImg from "@/assets/img/dog.jpg";

export const TopAdsPanel = () => {
  return (
    <div className={styles["items-container"]}>
      <TopAdsItem item={{ img: houseImg }} />
      <TopAdsItem item={{ img: routerImg }} />
      <TopAdsItem item={{ img: glassesImg }} />
      <TopAdsItem item={{ img: tarasImg }} />
      <TopAdsItem item={{ img: dogImg }} />
    </div>
  );
};

export default TopAdsPanel;
