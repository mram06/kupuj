import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <span className="text-[150px] font-black text-emerald-500/20 absolute inset-0 select-none">
                404
              </span>
              <span className="text-6xl font-bold text-emerald-600 relative z-10">
                404
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ой! Сторінку не знайдено
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Схоже, ця сторінка пішла на пошуки нових товарів і ще не
              повернулася. Давайте знайдемо щось цікавіше разом!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link
              to="/"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Головна сторінка
              </h3>
              <p className="text-gray-600 text-sm">
                Повернутися до каталогу товарів
              </p>
            </Link>

            <Link
              to="/add"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">➕</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Додати оголошення
              </h3>
              <p className="text-gray-600 text-sm">
                Розмістити своє оголошення
              </p>
            </Link>

            <Link
              to="/profile"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Мій профіль</h3>
              <p className="text-gray-600 text-sm">
                Переглянути свої оголошення
              </p>
            </Link>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <span className="mr-2">←</span>
              Повернутися назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
