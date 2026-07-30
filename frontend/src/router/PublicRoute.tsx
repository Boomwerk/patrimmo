import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PublicRoute = () => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if(isAuthenticated){
        return <Navigate to="/tableau-de-bord" replace/>
    }

    return <Outlet/>
}

export default PublicRoute;