import { NavLink } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";



export const Submenu = () =>{

    

    return (
        <div role="tablist" className="tabs tabs-border">
            
            <NavLink to="/parametres" end role="tab" className="tab gap-2 font-bold text-lg"><RiUserSettingsLine /> Mon Profil</NavLink>
            <NavLink to="/parametres/mot-de-passe" role="tab" className="tab gap-2 font-bold text-lg"><RiLockPasswordLine /> Sécurité</NavLink>
            
        </div>
    );

} 