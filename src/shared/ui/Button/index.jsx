export const Button = ({ children, isLoading, ...rest }) => (
  <button disabled={isLoading} {...rest} className="btn-primary">
    {isLoading ? <span className="btn-spinner"></span> : children}
  </button>
);
