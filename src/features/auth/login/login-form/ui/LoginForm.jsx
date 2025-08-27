export const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" className="bg-gray-300" name="email" />
      </label>
      <label>
        <input type="text" className="bg-gray-300" name="password" />
      </label>
      <button type="submit" className="bg-amber-300">
        login
      </button>
    </form>
  );
};
