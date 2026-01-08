import dropdownIcon from "@/assets/icons/expand-more.svg";
import styles from "./index.module.css";

export const Dropdown = ({
  label,
  title,
  error,
  errorPosition,
  multiple,
  secondary,
  options = [],
  ...rest
}) => {
  const dropdownStyle = () => {
    return !secondary
      ? styles["dropdown-primary"]
      : styles["dropdown-secondary"];
  };

  return (
    <div className="flex flex-col gap-2">
      {error && errorPosition === "top" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
      {label && <label>{label}</label>}
      <div className="relative">
        <select
          multiple={!!multiple}
          className={`${dropdownStyle()} ${error ? "!border-red-500" : ""}`}
          {...rest}
        >
          {!multiple && <option value="">{title}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button className={styles["dropdown-picker"]}>
          <img src={dropdownIcon} />
        </button>
      </div>
      {error && errorPosition === "bottom" && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};
