import styles from "./index.module.css";

export const Textarea = ({
  label,
  error,
  errorPosition,
  secondary = false,
  hint,
  maxLength,
  ...rest
}) => {
  const textareaStyle = () => {
    return !secondary
      ? styles["textarea-primary"]
      : styles["textarea-secondary"];
  };

  return (
    <div className="flex flex-col gap-2">
      {error && errorPosition === "top" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
      {label && <label>{label}</label>}
      <textarea
        className={`${textareaStyle()} ${error ? "!border-red-500" : ""}`}
        {...rest}
      />
      <div className="flex items-center">
        {hint && !error && <div className="">{hint}</div>}{" "}
        {maxLength && <div className="ml-auto">0/{maxLength}</div>}
      </div>
      {error && errorPosition === "bottom" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};
