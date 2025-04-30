import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserProfile from "./pages/userProfile";
import HomePage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<UserProfile />} path="/profile" />
      <Route element={<HomePage />} path="/home" />

    </Routes>
  );
}

export default App;
