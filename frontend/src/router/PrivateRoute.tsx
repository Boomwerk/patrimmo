import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";


const PrivateRoute = ({children} : {children: React.ReactNode}) => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to="/connexion" replace />
    }

    return <>{children}</>
}

export default PrivateRoute;