import { Link } from "react-router-dom";
import "./Footer.css"; // (опціонально) стилі

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <h3 className="footer__logo">🎬 Кіноафіша</h3>
          <p className="footer__text">
            © {new Date().getFullYear()} Кіноафіша. Усі права захищено.
          </p>
        </div>

        <div className="footer__links">
          <Link to="/" className="footer__link">
            Головна
          </Link>
          <Link to="/search" className="footer__link">
            Пошук
          </Link>
          <Link to="/favorites" className="footer__link">
            Обрані
          </Link>
          <Link to="/sessions" className="footer__link">
            Сеанси
          </Link>
        </div>
      </div>
    </footer>
  );
}
