import axios from "axios";
import { serverUrl } from "../constants";

function getToken() {
    const token = localStorage.getItem("token");
    return token;
}

export const fetchFeedbacks = async () => {
    const token = getToken();
    return await axios.get(`${serverUrl}/feedbacks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  return await axios.post(`${serverUrl}/login`, credentials);
};