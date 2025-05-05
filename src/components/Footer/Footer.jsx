import { Link } from "react-router-dom";
import "./Footer.css"; // (опціонально) стилі

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">

          <Link to="/" className="footer__logo">
            <img className="footer__icon" src="src/assets/icon.svg" alt="icon"/>
            <h3 className="footer__title">Кіноафіша</h3>
          </Link>
          <p className="footer__text">
            © {new Date().getFullYear()} Кіноафіша. Усі права захищено.
          </p>
        </div>

        <div className="footer__links">
          <ul className="footer__items">
            <li className="footer__item">
            <Link to="/" className="footer__link">
              Головна
            </Link>
            </li>
            <li className="footer__item">
            <Link to="/search" className="footer__link">
              Пошук
            </Link>
            </li>
            <li className="footer__item">
            <Link to="/favorites" className="footer__link">
              Обрані
            </Link>
            </li>
            <li className="footer__item">
            <Link to="/sessions" className="footer__link">
              Сеанси
            </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
