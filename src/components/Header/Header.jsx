import { Link } from "react-router-dom";
import "./Header.css"; // (опціонально) стилі
import { useEffect } from "react";

export default function Header() {
  const isLoggedIn = false;

  useEffect(() => {
    const hamburger = document.querySelector('.header__burger');
    const menu = document.querySelector('.menu');
    const closeElem = document.querySelector('.menu__close');

    const openMenu = () => menu.classList.add('active');
    const closeMenu = () => menu.classList.remove('active');

    hamburger?.addEventListener('click', openMenu);
    closeElem?.addEventListener('click', closeMenu);

    // Очищення подій при розмонтуванні компонента
    return () => {
      hamburger?.removeEventListener('click', openMenu);
      closeElem?.removeEventListener('click', closeMenu);
    };
  }, []);
  
  return (
    <header className="header">
            <div class="menu">
        <div class="menu__block">
            <div class="menu__close">
                <svg width="25" height="25" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183717 1.30861 -0.183717 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183717 26.55 -0.183717 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="#CCCCCC"/>
                </svg>    
            </div>
            <nav>
              <ul class="header__items">
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
        <div class="menu__overlay"></div>
    </div>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img className="header__icon" src="src/assets/icon.svg" alt="icon"/>
          <div className="header__title">Кіноафіша</div>
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

        <div className="header__auth header__auth-hidden">
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
      <div class="header__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
