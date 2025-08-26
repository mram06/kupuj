import { AddLinkButton } from "@/features/ads/add-button/ui/AddLinkButton";

export const TopAdsItem = ({ item, children }) => {
  return (
    <article className="relative group rounded-2xl overflow-hidden">
      <div className="w-full h-full z-1">
        <img
          src={item.img}
          alt="item image"
          className="w-full h-full object-cover"
        />
        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 backdrop-blur-sm bg-emerald-900/45 z-10 transition-opacity"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <AddLinkButton />
        </div>
      </div>
    </article>
  );
};

export default TopAdsItem;
