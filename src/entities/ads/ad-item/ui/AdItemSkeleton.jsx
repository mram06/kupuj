export const AdItemSkeleton = () => {
  return (
    <article className="bg-gray-100 rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Image */}
      <div className="w-full sm:w-84 h-40 sm:h-56 flex-shrink-0 rounded-2xl bg-gray-300 animate-pulse"></div>

      <div className="flex-auto flex flex-col min-w-0">
        {/* Title and price */}
        <div className="text-lg sm:text-2xl flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between">
          <div className="col-span-1 sm:col-span-3 w-full h-6 sm:h-8 rounded-2xl bg-gray-300 animate-pulse"></div>
          <div className="w-full sm:w-20 h-6 sm:h-8 rounded-2xl bg-gray-300 animate-pulse"></div>
        </div>

        {/* Condition */}
        <div className="mt-3 sm:mt-4 w-20 h-7 sm:h-8 rounded-2xl bg-gray-300 self-start animate-pulse"></div>

        {/* Date and city */}
        <div className="mt-3 sm:mt-auto flex flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2 sm:gap-0">
          <div className="flex flex-col gap-1">
            <p className="w-32 sm:w-28 h-3 sm:h-4 rounded-2xl bg-gray-300 animate-pulse"></p>
            <p className="w-32 sm:w-28 h-3 sm:h-4 rounded-2xl bg-gray-300 animate-pulse"></p>
          </div>
          <div className="self-end sm:self-auto w-8 h-8 rounded-2xl bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </article>
  );
};
