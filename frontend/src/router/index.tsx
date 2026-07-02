import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


export const router = createBrowserRouter([
    {
        path: "/inscription",
        element: <PublicRoute> <RegisterPage /> </PublicRoute> 
    },
    {
        path: "/connexion",
        element: <PublicRoute><LoginPage /></PublicRoute>
    },
    {
        path: "/tableau-de-bord",
        element: <PrivateRoute><DashboardPage/></PrivateRoute>
    },
    
])