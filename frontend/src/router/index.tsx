import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";


export const router = createBrowserRouter([
    {
        path: "/inscription",
        element: <RegisterPage />
    },
    {
        path: "/connexion",
        element: <LoginPage />
    },
    {
        path: "/tableau-de-bord",
        element: <DashboardPage />
    },
    
])