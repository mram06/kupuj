import { useState } from "react";

export const TopAdsItem = ({ item, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <article className="relative group rounded-2xl overflow-hidden">
      <div className="w-full h-full z-1">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-5">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full"></div>
            </div>
          </div>
        )}
        <img
          src={item?.photos[0]}
          alt="item image"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
        />
        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 backdrop-blur-sm bg-emerald-900/45 z-10 transition-opacity"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {children}
        </div>
      </div>
    </article>
  );
};

export default TopAdsItem;
