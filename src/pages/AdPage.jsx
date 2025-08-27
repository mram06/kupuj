import { useParams } from "react-router";

function AdPage() {
  const { id } = useParams();
  return <div>ad {id}</div>;
}

export default AdPage;
