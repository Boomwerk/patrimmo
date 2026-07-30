import { useLogout } from "../hooks/useLogout";
import { IoIosLogOut } from "react-icons/io";



export const LogoutButton = () => {

    const {logout} = useLogout();

    return (

        <button onClick={logout} className="bg-error text-base-100">
           <IoIosLogOut /> Deconnexion
        </button>
    );
}