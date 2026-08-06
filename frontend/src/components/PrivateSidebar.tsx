import { MdOutlineDashboard, MdOutlineSupport } from "react-icons/md";
import { FaRegBuilding, FaUsers, FaRegFileAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export const PrivateSidebar = () => {
    return (
        <div className="h-full bg-base-100 px-6 lg:px-10 w-64 lg:w-75 flex flex-col justify-between">
            <div className="mt-5 flex flex-col gap-4">
                <div className="mb-20">
                    <h1 className="text-xl font-bold">PATRIMMO</h1>
                    <p className="text-sm">Espace privé</p>
                </div>

                <div>
                    <a href="" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"><MdOutlineDashboard /> Tableau de bord</a>
                </div>

                <div>
                    <a href="" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"><FaRegBuilding /> Propriétés</a>
                </div>

                <div>
                    <a href="" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"><FaUsers /> Locataires</a>
                </div>

                <div>
                    <a href="" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"> <FaRegFileAlt />Documents</a>
                </div>
            </div>

            <div className="flex flex-col">
                <hr className="mb-5 text-base-300" />
                <a href="/parametres" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"><IoSettingsOutline /> Paramètres</a>
                <a href="" className="flex items-center gap-2 hover:bg-base-200 rounded p-2"><MdOutlineSupport /> Support</a>
            </div>
        </div>
    );
};