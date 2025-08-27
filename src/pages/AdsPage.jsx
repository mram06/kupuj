import { useParams } from "react-router";

function AdsPage() {
  const { categoryId } = useParams();
  return <div>ads page {categoryId}</div>;
}

export default AdsPage;
