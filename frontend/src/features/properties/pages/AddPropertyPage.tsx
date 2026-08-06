import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { PropertyForm } from "../components/PropertyForm";
import { PropertyAssetPanel } from "../components/PropertyAssetPanel";

export const AddPropertyPage = () => {
    return (
        <div className="bg-base-300 min-h-screen p-4 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
                <Link to="/biens" className="btn btn-ghost btn-square text-[#19355C]" aria-label="Retour">
                    <RiArrowLeftLine className="text-xl" />
                </Link>
                <h1 className="text-3xl font-bold text-[#19355C]">Ajouter une Propriété</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <PropertyForm />
                </div>
                <PropertyAssetPanel />
            </div>
        </div>
    );
};