import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pomodoro from "./pages/Pomodoro";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/pomodoro" />} />
        <Route
          path="/pomodoro"
          element={<Pomodoro user={user} setUser={setUser} />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
