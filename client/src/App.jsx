import SignupPage from "./pages/Register"
import { Route,Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/Login";
import Home  from "./pages/Home.jsx";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { Counter } from "./Counnter.jsx";

function App() {
  

  return (
    <>
   <ToastContainer/>

      <Routes>
      <Route path="/register" element={<PublicRoute><SignupPage/></PublicRoute>}/>
      <Route path="/login" element={<PublicRoute><SignIn/></PublicRoute>}/>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/updateProfile" element={<UpdateProfile/>} />
     </Routes>

     <Routes>
      <Route path="/admin/adminDashboard" element={<AdminDashboard/>}/>
     </Routes>
     <Routes>
      <Route path="/couter" element={<Counter/>}/>
     </Routes>

     
    </>
  )
}

export default App
