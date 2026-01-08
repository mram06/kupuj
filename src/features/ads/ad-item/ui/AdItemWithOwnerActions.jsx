import { AdItem } from "@/entities/ads/ad-item/ui/AdItem";
import { DeleteAdButton } from "../../delete-ad-button";
import { EditAdButton } from "../../edit-ad-button";

export const AdItemWithOwnerActions = ({ data }) => {
  return (
    <AdItem data={data}>
      <div className="flex gap-2">
        <DeleteAdButton id={data.id} />
        <EditAdButton id={data.id} />
      </div>
    </AdItem>
  );
};
