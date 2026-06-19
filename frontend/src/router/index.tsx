import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />
    }
])