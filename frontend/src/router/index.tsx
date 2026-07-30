import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { PrivateLayout } from "../layouts/PrivateLayout";

export const router = createBrowserRouter([

    {
        element: <PrivateRoute />,
        children: [
            {
                element: <PrivateLayout />,
                children: [
                    
                    {
                        path: "tableau-de-bord",
                        element: <DashboardPage/>
                    },
                ]
            }
        ]
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: "inscription",
                element: <RegisterPage />
            },
            {
                path: "connexion",
                element: <LoginPage />
            }
            
        ]
    }
    
    
])