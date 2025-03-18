import axios from "axios";
import { serverUrl } from "../constants";

function getToken() {
    const token = localStorage.getItem("token");
    return token;
}

export const fetchFeedbacks = async (userId:string|undefined) => {
    const token = getToken();
    return await axios.get(`${serverUrl}/api/feedback/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
};

export const feedbackSubmit = async (formDatas:{name:string, email:string, message:string})=>{
  const token = getToken();
  return await axios.post(`${serverUrl}/api/feedback/`,formDatas,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  return await axios.post(`${serverUrl}/api/auth/login`, credentials);
};
export const registerUser = async (credentials: { name:string, email: string; password: string }) => {
  return await axios.post(`${serverUrl}/api/auth/register`, credentials);
};


export const fetchAllFeedbacks = async ()=>{
  const token = getToken();
  return await axios.get(`${serverUrl}/api/feedbacks/all`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}