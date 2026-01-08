import styles from "./index.module.css";

export const Input = ({
  label,
  error,
  errorPosition = "bottom",
  secondary = false,
  hint,
  ...rest
}) => {
  const inputStyle = () => {
    return !secondary ? styles["input-primary"] : styles["input-secondary"];
  };

  return (
    <div className="flex flex-col gap-2">
      {error && errorPosition === "top" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
      {label && <label>{label}</label>}
      <input
        className={`${inputStyle()} ${error ? "!border-red-500" : ""}`}
        {...rest}
      />
      {hint && !error && <div className="">{hint}</div>}{" "}
      {error && errorPosition === "bottom" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};
