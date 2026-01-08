export const NotFound = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Нічого не знайдено
      </h3>
      <p className="text-gray-600 text-center">
        {message || "Спробуйте змінити параметри пошуку або фільтри"}
      </p>
    </div>
  );
};
