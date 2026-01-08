import { useGetAdvertsQuery } from "@/features/ads/api/advertsApi";
import { useEffect, useRef, useState } from "react";
import linkImages from "@/shared/api/linkImages";
import { useSearchParams } from "react-router";
import { AdItemSkeleton } from "@/entities/ads/ad-item/ui/AdItemSkeleton";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Error, NotFound } from "@/shared/ui/Notifications";
import { AdItemWithActions } from "@/features/ads/ad-item";
import { useSelector } from "react-redux";

export const AdsList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const isLoadingRef = useRef(false); // трек стану завантаження

  const { data, isLoading, error } = useGetAdvertsQuery({
    query: searchParams.toString(),
    page,
  });

  // Accumulate items from pages
  useEffect(() => {
    if (data?.data && !isLoading) {
      setItems((prev) => {
        if (page === 1) return data.data;
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = data.data.filter((item) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [data, isLoading, page]);

  // Change page number when query changed
  useEffect(() => {
    setPage(1);
    setItems([]);
    isLoadingRef.current = false;
  }, [searchParams]);

  // When loading set isLoadingRef state
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Reset isLoadingRef when data arrives
  useEffect(() => {
    if (data && !isLoading) {
      isLoadingRef.current = false;
    }
  }, [data, isLoading]);

  // Hook for infinite scroll
  useInfiniteScroll(() => {
    if (isLoadingRef.current) return;

    const loadedCount = items.length;
    const total = data?.total || 0;

    // Load while loadedCount < total
    if (!error && loadedCount > 0 && loadedCount < total) {
      isLoadingRef.current = true;
      setPage((prev) => prev + 1);
    }
  }, 300);

  return (
    <>
      <section className="mt-12">
        <div className="container">
          {items.length > 0 && (
            <h2 className="subtitle">Знайдено {data.total} оголошень</h2>
          )}

          <div className="mt-6 flex flex-col gap-6">
            {linkImages(items).map((ad) => (
              <AdItemWithActions key={ad.id} data={ad} />
            ))}
            {(isLoading ||
              isLoadingRef.current ||
              (items.length === 0 && data?.total !== 0)) &&
              !error && <AdItemSkeleton />}

            {!isLoading &&
              !isLoadingRef.current &&
              items.length === 0 &&
              !error &&
              data?.total === 0 && <NotFound />}

            {error && <Error />}
          </div>
        </div>
      </section>
    </>
  );
};
