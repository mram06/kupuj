import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useRefreshMutation } from "@/features/auth";

export function AppInit() {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await refresh().unwrap();
    };
    init();
  }, [refresh, dispatch]);

  return null;
}
