import { Route, Routes } from "react-router"
import Login from "../components/Login"
import Register from "../components/Register"
import Sidebar from "../components/Sidebar"


const UserRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Sidebar/>}/>
    </Routes>
  )
}

export default UserRoute