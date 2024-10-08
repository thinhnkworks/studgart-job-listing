import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/auth/Login";
import MainLayout from "./components/MainLayout";
import About from "./views/auth/About";
import Register from "./views/auth/Register";
import PasswordReset from "./views/auth/PasswordReset";
import VerifyEmail from "./views/auth/VerifyEmail";
import ResetPassWord from "./views/auth/PasswordNew";
import PostJob from "./views/recruiter/PostJob";
import Job from "./views/jobseeker/Jobs";
import CompanyInfoForm from "./views/company/CompanyInfoForm";
import AdminDashboard from "./views/admin/Dashboard"; // Adjusted import for AdminDashboard
import AccountAll from "./views/admin/AccountAll"; // Adjusted import for AccountAll

function App() {
  return (
    <div className=" overflow-y-scroll"> {/* Sử dụng thanh cuộn tổng */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/verify/:token" element={<VerifyEmail />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassWord />} />

        {/* Nesting MainLayout for main application routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="about" element={<About />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Nested AdminDashboard */}
          <Route path="/admin/accountall" element={<AccountAll />} /> {/* Nested AccountAll */}
          <Route path="/recruiter/postjob" element={<PostJob />} />
          <Route path="jobseeker/jobs" element={<Job />} />
          <Route path="/company/info" element={<CompanyInfoForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
