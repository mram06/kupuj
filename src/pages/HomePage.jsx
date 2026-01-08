import { SearchField } from "@/features/ads/search-field";
import { Banner } from "@/shared/ui/Banner";
import { CategoriesRow } from "@/widgets/Categories-row/ui/CategoriesRow";
import { TopAdsPanel } from "@/widgets/Top-ads-panel";

function HomePage() {
  return (
    <>
      <Banner />
      <section className="container mx-auto pt-12">
        <h2 className="subtitle">Категорії</h2>
        <CategoriesRow />
        <div className="mt-6">
          <SearchField />
        </div>
      </section>
      <section className="container mx-auto py-12">
        <div>
          <h2 className="subtitle">ТОП оголошення</h2>
        </div>
        <div>
          <TopAdsPanel />
        </div>
      </section>
    </>
  );
}

export default HomePage;
