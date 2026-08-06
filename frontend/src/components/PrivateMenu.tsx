import { IoSettingsOutline } from "react-icons/io5";
import { RiMenuLine } from "react-icons/ri";
import { LogoutButton } from "../features/auth/components/LogoutButton";

export const PrivateMenu = () => {
    return (
        <nav className="flex">
            <div className="navbar bg-base-100 px-4 lg:px-10">
                <div className="flex-1 flex items-center gap-2">
                    <label htmlFor="private-drawer" className="btn btn-ghost btn-square lg:hidden" aria-label="Ouvrir le menu">
                        <RiMenuLine className="text-xl" />
                    </label>
                    <a className="btn btn-ghost text-xl"></a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a><IoSettingsOutline />  Paramètre</a></li>
                            <li><LogoutButton /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}