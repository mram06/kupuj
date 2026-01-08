import { Banner } from "@/shared/ui/Banner";
import { AdsList } from "@/widgets/ads/Ads-list/ui/AdsList";
import { FilterPanel } from "@/widgets/ads/FilterPanel/ui/FilterPanel";

function AdsPage() {
  return (
    <>
      <Banner />
      <FilterPanel />
      <AdsList />
    </>
  );
}

export default AdsPage;
