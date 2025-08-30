export const Input = ({ label, error, hint, ...rest }) => (
  <div>
    {label && <label>{label}</label>}
    <input
      {...rest}
      className={`input-primary ${error ? "!border-red-500" : ""}`}
    />
    {hint && !error && <div className="">{hint}</div>}
    {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
  </div>
);
