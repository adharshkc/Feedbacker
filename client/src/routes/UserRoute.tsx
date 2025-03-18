import { Navigate, Route, Routes } from "react-router"
import Login from "../components/common/Login"
import Register from "../components/common/Register"
import Sidebar from "../components/User/Sidebar"
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  
  return token ? children : <Navigate to="/login" replace />;
};


const UserRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default UserRoute