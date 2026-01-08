import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useRefreshToken } from "@/features/auth/refresh";
import { useGetFavoritesIdsQuery } from "@/features/ads/api/advertsApi";

export function AppInit() {
  const { refresh } = useRefreshToken();
  const user = useSelector((state) => state.auth.user);

  useGetFavoritesIdsQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    const init = async () => {
      await refresh();
    };
    init();
  }, []);

  return null;
}
