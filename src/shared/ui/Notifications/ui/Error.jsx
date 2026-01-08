export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Сталася помилка</h3>
      <p className="text-gray-600 text-center">
        Спробуйте пізніше або оновіть сторінку
      </p>
    </div>
  );
};
