import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import AdminPage from "./Pages/AdminPage";

function App() {
  const user = true
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-white relative overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to='/'/>} />
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to='/'/>} />
          {/* <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to='/login'/>} /> */}
          <Route path="/secret-dashboard" element={<AdminPage/>} />
        </Routes>
      <Footer/>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
