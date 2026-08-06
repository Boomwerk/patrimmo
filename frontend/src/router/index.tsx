import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { UserSettingsPage } from "../features/userSettings/pages/UserSettingsPage";
import { ProfilSetting } from "../features/userSettings/pages/ProfileSetting";
import { PasswordSetting } from "../features/userSettings/pages/PasswordSetting";
import { HomePage } from "../features/home/pages/HomePage";
import { AddPropertyPage } from "../features/properties/pages/AddPropertyPage";
import { PropertiesListPage } from "../features/properties/pages/PropertiesListPage";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <HomePage />
    },
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
                    {
                        path: "biens",
                        element: <PropertiesListPage/>
                    },
                    {
                        path: "biens/ajouter",
                        element: <AddPropertyPage/>
                    },
                     {
                        path: "parametres",
                        element: <UserSettingsPage/>,
                        children: [
                            
                            {
                                index:true,
                                element: <ProfilSetting />
                            },
                            {
                                path:"mot-de-passe",
                                element: <PasswordSetting />
                            }
                        ]
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