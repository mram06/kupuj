import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "@/features/auth";

import { useRefreshMutation } from "@/features/auth/api/authApi";

export function AppInit() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await refresh().unwrap();
        } catch {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch, refresh]);
}
