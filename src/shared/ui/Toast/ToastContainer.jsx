import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "./toastSlice";
import { Toast } from "./index";

export const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.toasts);
  const [exitingToasts, setExitingToasts] = useState(new Set());

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        setExitingToasts((prev) => new Set(prev).add(toast.id));
        setTimeout(() => {
          dispatch(removeToast(toast.id));
          setExitingToasts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(toast.id);
            return newSet;
          });
        }, 300); // час анімації
      }, toast.duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  const handleClose = (id) => {
    setExitingToasts((prev) => new Set(prev).add(id));
    setTimeout(() => {
      dispatch(removeToast(id));
      setExitingToasts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          description={toast.description}
          onClose={() => handleClose(toast.id)}
          isExiting={exitingToasts.has(toast.id)}
        />
      ))}
    </div>
  );
};
