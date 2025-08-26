import { AddLinkButton } from "@/features/ads/add-button/ui/AddLinkButton";
import { CategoriesRow } from "@/widgets/Categories-row/ui/CategoriesRow";
import { TopAdsPanel } from "@/widgets/Top-ads-panel";

function HomePage() {
  return (
    <div>
      <section className="container mx-auto  py-12 bg-gray-200">
        <h1 className="title text-center">Знаходь, купуй та продавай :)</h1>
      </section>

      <section className="container mx-auto pt-12">
        <h1 className="subtitle">Категорії</h1>
        <CategoriesRow />
      </section>

      <section className="container mx-auto py-12">
        <div>
          <h1 className="subtitle">ТОП оголошення</h1>
        </div>
        <div>
          <TopAdsPanel />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
