import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";


const PrivateRoute = () => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to="/connexion" replace />
    }

    return <Outlet/>
}

export default PrivateRoute;