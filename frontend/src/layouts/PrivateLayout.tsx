import { Outlet } from "react-router-dom";
import { PrivateMenu } from "../components/PrivateMenu";
import { PrivateSidebar } from "../components/PrivateSidebar";

export const PrivateLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="private-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col w-full min-h-screen">
                <PrivateMenu />
                <Outlet />
            </div>

            <div className="drawer-side z-20">
                <label htmlFor="private-drawer" aria-label="Fermer le menu" className="drawer-overlay"></label>
                <PrivateSidebar />
            </div>
        </div>
    );
}