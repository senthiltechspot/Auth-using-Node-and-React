import "./App.css";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <Protected />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
