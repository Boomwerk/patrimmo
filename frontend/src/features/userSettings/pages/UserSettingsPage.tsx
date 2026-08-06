import { Outlet } from "react-router-dom"
import { Submenu } from "../components/submenu"


export const UserSettingsPage = () => {
    


    return (
        <div className="bg-base-300 h-screen p-10">

            <div>
                <h1 className="text-3xl font-bold">Paramètres</h1>

            </div>


            <div className=" p-10 rounded my-5  flex gap-4 ">
                <Submenu/>
            </div>
            <div>
                <Outlet />
            </div>


        </div>
    )


}