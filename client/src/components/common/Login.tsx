import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import imageLogin from "../assets/image.png";
import { useLogin } from "../../hooks/useAuth";
import { LoginFormData, loginSchema } from "../../schemas/authSchema";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
    });
  
    const { mutate, status, error } = useLogin();
  
    const onSubmit = (data: LoginFormData) => {
      mutate(data);
    };

    useEffect(()=>{
      const token = localStorage.getItem("token")
      if(token){
        navigate('/dashboard')
      }
    },[])
  
    return (
      <div className="flex items-center justify-center h-[90vh] w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(${imageLogin})`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Sign In</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  className={`text-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  {...register("password")}
                  className={`text-gray-700 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "pending"} 
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 disabled:bg-blue-400"
                >
                  {status === "pending" ? "Logging in..." : "Login"}
                </button>
              </div>
              {status === "error" && ( 
                <p className="text-red-500 text-xs mt-2 text-center">
                  {error.response?.data?.message || "An error occurred during login."}
                </p>
              )}
            </form>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to={"/register"}
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login