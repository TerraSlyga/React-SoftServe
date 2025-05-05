import { Link } from "react-router-dom";
import "./Header.css"; // (опціонально) стилі

export default function Header() {
  const isLoggedIn = false; // тимчасово, пізніше заміниш через context або hook

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          🎬 Кіноафіша
        </Link>

        <nav className="header__nav">
        <ul className="header__items">
            <li className="header__item">
              <Link to="/" className="header__link">
                Головна
              </Link>
            </li>
            <li className="header__item">
              <Link to="/search" className="header__link">
                Пошук
              </Link>
            </li>
            <li className="header__item">
              <Link to="/sessions" className="header__link">
                Сеанси
              </Link>
            </li>
            <li className="header__item">
              <Link to="/favorites" className="header__link">
                Обрані
              </Link>
            </li>
            {isLoggedIn && (
              <li className="header__item">
                <Link to="/admin" className="header__link">
                  Адмін
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__auth">
          {isLoggedIn ? (
            <Link to="/profile" className="header__button">
              Профіль
            </Link>
          ) : (
            <>
              <Link to="/login" className="header__button">
                Увійти
              </Link>
              <Link
                to="/register"
                className="header__button header__button--outline"
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
