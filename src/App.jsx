import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router"; // Імпорт маршрутизатора

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
