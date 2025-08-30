import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useRefreshToken } from "@/features/auth/refresh";

export function AppInit() {
  const { refresh } = useRefreshToken();

  useEffect(() => {
    const init = async () => {
      await refresh();
    };
    init();
  }, []);

  return null;
}
