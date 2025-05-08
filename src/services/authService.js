const API = "http://localhost:8080/api/auth";

const login = async (credentials) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Неправильний логін або пароль");
  }

  return await response.json();
};

const register = async (credentials) => {
  const response = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Register failed");
  }

  return await response.json();
};

export default {
  login,
  register,
};
