import { useResetPasswordMutation } from "@/features/auth/api/authApi";
import { useEffect, useRef, useState } from "react";

export const ResetPasswordGetTokenAgainButton = ({ userEmail }) => {
  const [coolDown, setCoolDown] = useState(30);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (coolDown > 0) {
      intervalRef.current = setInterval(() => {
        setCoolDown((prevVal) => {
          if (prevVal <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevVal - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [coolDown]);

  const [reset] = useResetPasswordMutation();
  const handleClick = async () => {
    try {
      await reset({ email: userEmail });
      setCoolDown(30);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={coolDown > 0}
      className={`self-start ${
        coolDown > 0 ? "text-gray-500" : "underline cursor-pointer"
      }`}
    >
      {coolDown > 0
        ? `Відправити код повторно через ${coolDown} сек`
        : "Відправити код повторно"}
    </button>
  );
};
