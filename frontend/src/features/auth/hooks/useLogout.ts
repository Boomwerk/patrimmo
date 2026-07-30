import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../stores/authStore"


export const useLogout = () => {


  const navigate = useNavigate();

  const logoutUser = useAuthStore( state => state.clearAuth);

  const logout = () => {
    
    logoutUser();
    navigate("/connexion");

  };

  return {logout};



}