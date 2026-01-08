export const Button = ({
  children,
  isLoading,
  secondary,
  white,
  danger,
  ...rest
}) => {
  const btnStyleClass = () => {
    if (secondary) return "btn-secondary";
    if (white) return "btn-white";
    if (danger) return "btn-danger";

    return "btn-primary";
  };

  return (
    <button disabled={isLoading} className={btnStyleClass()} {...rest}>
      {isLoading ? <span className="btn-spinner"></span> : children}
    </button>
  );
};
