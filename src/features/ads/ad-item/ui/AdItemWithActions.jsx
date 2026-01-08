import { AdItem } from "@/entities/ads/ad-item/ui/AdItem";
import { AddToFavoritesButton } from "../../add-to-favorites-button";

export const AdItemWithActions = ({ data }) => {
  return (
    <AdItem data={data}>
      <AddToFavoritesButton id={data.id} />
    </AdItem>
  );
};
