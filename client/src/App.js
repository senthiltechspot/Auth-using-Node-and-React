import "./App.css";
import Register from "./Pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Protected from "./Pages/Protected";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const PrivateRoute = ({ children }) => {
    const token = cookies.get("accessToken");
    return token ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Register />} /> */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Protected />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
