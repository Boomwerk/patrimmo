import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PublicRoute = ({children}: {children: React.ReactNode}) => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if(isAuthenticated){
        return <Navigate to="/tableau-de-bord" replace/>
    }

    return <>{children}</>
}

export default PublicRoute;