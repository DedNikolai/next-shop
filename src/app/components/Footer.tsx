export default function Footer() {
    return (
      <footer className="bg-black text-gray-300 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-bold text-red-500">FoodExpress</span>
            </div>
            <p className="text-gray-400">
              Гаряча доставка піци, суші, бургерів та снеків прямо до ваших дверей. Швидко, смачно, з любовʼю!
            </p>
          </div>
  
          {/* Меню */}
          <div>
            <h4 className="text-white font-semibold mb-3">Меню</h4>
            <ul className="space-y-2">
              <li><a href="/catalog/pizza" className="hover:text-white transition">Піца</a></li>
              <li><a href="/catalog/burgers" className="hover:text-white transition">Бургери</a></li>
              <li><a href="/catalog/sushi" className="hover:text-white transition">Суші</a></li>
              <li><a href="/catalog/snacks" className="hover:text-white transition">Снеки</a></li>
            </ul>
          </div>
  
          {/* Контакти */}
          <div>
            <h4 className="text-white font-semibold mb-3">Контакти</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: <a href="mailto:info@foodexpress.ua" className="hover:text-white">info@foodexpress.ua</a></li>
              <li>Тел: <a href="tel:+380991234567" className="hover:text-white">+38 (099) 123-45-67</a></li>
              <li className="flex gap-3 text-xl mt-2">
                <a href="#" className="hover:text-white">📘</a>
                <a href="#" className="hover:text-white">📸</a>
                <a href="#" className="hover:text-white">📞</a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
          © {new Date().getFullYear()} FoodExpress. Усі права захищено.
        </div>
      </footer>
    );
  }
  