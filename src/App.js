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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/pomodoro" />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
