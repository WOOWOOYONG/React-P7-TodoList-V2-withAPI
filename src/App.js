import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoPage from "./components/TodoPage";
import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import LogoImg from "./img/logo.png";
import WorkImg from "./img/workImg.png";
import { AuthContext, useAuth } from "./components/Context";
import { ProtectedRoute } from "./components/ProtectedRoute";

//component 首頁
const Home = () => {
  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a href="#">
            <img className="logoImg" src={LogoImg} alt="" />
          </a>
          <img className="d-m-n" src={WorkImg} alt="workImg" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={ProtectedRoute}>
            <Route path="/todo" element={<TodoPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
