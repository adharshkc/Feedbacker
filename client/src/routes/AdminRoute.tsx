import { Navigate, Route, Routes } from "react-router"
import AdminDashboard from "../components/Admin/AdminDashboard";
import { ReactNode } from "react";


interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" replace />;
      }
      
      return <>{children}</>;
  };



const AdminRoute = ()=>{
    return (
        <Routes>
            <Route path="/" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        </Routes>
    )
}


export default AdminRoute;