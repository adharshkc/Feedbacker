import { Navigate, Route, Routes } from "react-router"
import Login from "../components/Login"
import Register from "../components/Register"
import Sidebar from "../components/Sidebar"
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Create a ProtectedRoute component with typed props
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