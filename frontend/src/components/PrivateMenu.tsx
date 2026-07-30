import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";



export const PrivateMenu = () => {



    return (
        <nav className="flex">

            <div className="navbar bg-base-100 px-10 ">
                <div className="flex-1">
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
                            <li><a className="bg-error"> <IoIosLogOut /> Déconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </nav>
    );
}