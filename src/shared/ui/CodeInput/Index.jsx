import { useRef, useEffect } from "react";
import { Input } from "@/shared/ui/Input";

export const CodeInput = ({ length = 6, value, onChange, error }) => {
  const inputRefs = useRef([]);
  const values = value ? value.split("") : new Array(length).fill("");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, inputValue) => {
    const newValues = [...values];
    newValues[index] = inputValue.slice(-1); // Тільки останній символ

    const newValue = newValues.join("");
    onChange(newValue);

    // Автоматичний перехід на наступний інпут
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace - перехід на попередній інпут
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);

    // Фокус на останній заповнений інпут
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          className={`input-primary font-bold ${
            error ? "!border-red-500" : ""
          }`}
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={values[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};
