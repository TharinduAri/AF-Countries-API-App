import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserProfile from "./pages/userProfile";
import HomePage from "./pages/home";
import CountryPage from "./pages/countryPage";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<UserProfile />} path="/profile" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<CountryPage />} path="/country/:id" />


    </Routes>
  );
}

export default App;
