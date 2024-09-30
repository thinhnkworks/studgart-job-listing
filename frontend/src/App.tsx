import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/auth/Login";
import MainLayout from "./components/MainLayout";
import About from "./views/auth/About";
import Register from "./views/auth/Register";
import PasswordReset from "./views/auth/PasswordReset";
import VerifyEmail from "./views/auth/VerifyEmail";
import ResetPassWord from "./views/auth/PasswordNew";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/verify/:token" Component={VerifyEmail} /> 
      <Route path="auth/reset-password/:token" Component={ResetPassWord} /> 
      {/* Nesting About under MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route path="about" element={<About />} />
        {/* Add other routes here */}
      </Route>
      <Route path="/abouts" element={<About />} />
    </Routes>
  );
}

export default App;
