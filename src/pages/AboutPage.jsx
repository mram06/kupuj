import { Banner } from "@/shared/ui/Banner";

function AboutPage() {
  return (
    <>
      <Banner />
      <div className="container">
        <div className="py-8 sm:py-12">
          {/* Header */}
          <section className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Про нас
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Kupuj — це простий та зручний майданчик для купівлі та продажу
              товарів. Ми допомагаємо мільйонам людей знаходити те, що вони
              шукають, та розпродавати речі, які вони більше не потребують.
            </p>
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <section className="p-4 sm:p-6 bg-gray-100 rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Наша місія
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Зробити купівлю та продаж товарів доступним для кожного. Ми
                прагнемо створити безпечне та надійне середовище, де люди можуть
                легко знаходити якісні товари за розумними цінами.
              </p>
            </section>

            {/* Values */}
            <section className="p-4 sm:p-6 bg-gray-100 rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Наші цінності
              </h2>
              <ul className="text-gray-700 text-sm sm:text-base space-y-2">
                <li>✓ Надійність та честь у всіх трансакціях</li>
                <li>✓ Прозорість та справедливість</li>
                <li>✓ Безпека користувачів</li>
                <li>✓ Інновації та постійне розвиток</li>
              </ul>
            </section>
          </div>

          {/* Why Choose Us */}
          <section className="mt-8 sm:mt-12 p-4 sm:p-6 bg-emerald-50 rounded-3xl border border-emerald-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Чому обирають Kupuj?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Простота використання
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  Інтуїтивний інтерфейс дозволяє легко розміщувати та знаходити
                  оголошення
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Безпечні платежі</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  Захищені трансакції та гарантія безпеки для обох сторін
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Великий вибір</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  Тисячі оголошень в різних категоріях на вибір
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Активна спільнота</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  Мільйони задоволених користувачів по всій країні
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-8 sm:mt-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Залишились питання?
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Напишіть нам на email або зв'яжіться через форму зворотного
              зв'язку
            </p>
            <a
              href="mailto:kupuj66@gmail.com"
              className="inline-block px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors"
            >
              Написати нам
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
