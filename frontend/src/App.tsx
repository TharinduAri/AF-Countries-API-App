import { Route, Routes } from "react-router-dom";

import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import HomePage from "./pages/home";
import UserProfile from "./pages/userProfile";

function App() {
  return (
    <Routes>
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<LoginPage />} path="/" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<UserProfile />} path="/profile" />


    </Routes>
  );
}

export default App;
