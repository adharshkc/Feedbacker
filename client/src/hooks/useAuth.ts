/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { loginUser } from "../services/appApi"



const userLogin = async(credentials:{email:string, password:string})=>{
const response = await loginUser(credentials)
return response.data
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.token); 
      navigate("/dashboard"); 
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};