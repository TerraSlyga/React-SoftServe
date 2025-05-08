import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled" && res.payload?.token) {
        navigate("/");
      }
    });
  };

  return (
    <div className="login-page">
      <h1>Вхід</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Завантаження..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}
