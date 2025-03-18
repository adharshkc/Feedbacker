/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../services/appApi";
import { useUserStore } from "../zustand/useUserStore";

const userLogin = async (credentials: { email: string; password: string }) => {
  const response = await loginUser(credentials);
  return response.data;
};

const userRegister = async (credentials: {name:string, email:string, password:string})=>{
  const response = await registerUser(credentials);
  return response.data;
}
export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      const user = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        role:data.data.role
      };
      setUser(user);
    
      if (data.data.role == "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};


export const useRegister = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);


  return useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
      const user = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        role:data.data.role
      };
      setUser(user);
      console.log(data)
        navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};


