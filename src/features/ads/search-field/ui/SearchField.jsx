import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router";

export const SearchField = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const toAds = (e) => {
    e.preventDefault();
    navigate(frontRoutes.pages.AdsPage.navigationPath("", search));
  };
  return (
    <form onSubmit={toAds}>
      <Input
        placeholder="Що шукаєте?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
