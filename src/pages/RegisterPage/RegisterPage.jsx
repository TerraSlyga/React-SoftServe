import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { loginUser } from "../../store/authSlice";
import "./RegisterPage.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }

    try {
      await authService.register({
        email: form.email,
        password: form.password,
      });

      // Можна виконати автоматичний вхід після реєстрації
      dispatch(loginUser({ email: form.email, password: form.password }))
        .unwrap()
        .then(() => navigate("/"))
        .catch(() => setError("Не вдалося автоматично увійти"));
    } catch (err) {
      setError(err.message || "Помилка реєстрації");
    }
  };

  return (
    <div className="register-page">
      <h1>Реєстрація</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Повторіть пароль"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}
