const API_BASE = "http://localhost:8080/api/sessions";

const getAllSessions = async () => {
  const response = await fetch(`${API_BASE}`);
  if (!response.ok) throw new Error("Server error");
  return await response.json();
};

export default {
  getAllSessions,
};
