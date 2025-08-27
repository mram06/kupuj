import { useDispatch } from "react-redux";
import { tokenRefreshed, logout } from "@/features/auth/api/authSlice";
import { useRefreshMutation } from "@/features/auth/api";

export function useRefreshToken() {
  const [refreshMutation] = useRefreshMutation();
  const dispatch = useDispatch();

  async function refresh() {
    try {
      const result = await refreshMutation();
      if (result.data) {
        dispatch(tokenRefreshed(result.data));
        return true;
      }
    } catch {
      dispatch(logout());
      return false;
    }
  }

  return { refresh };
}
