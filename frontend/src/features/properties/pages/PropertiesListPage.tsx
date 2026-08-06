import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { useProperties } from "../hooks/useProperties";
import { PropertyCard } from "../components/PropertyCard";

export const PropertiesListPage = () => {
    const { data: properties, isLoading, isError } = useProperties();

    return (
        <div className="bg-base-300 min-h-screen p-4 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#19355C]">Mes propriétés</h1>
                    <p className="text-[#434652] mt-1">Retrouvez ici l'ensemble de votre patrimoine immobilier.</p>
                </div>
                <Link
                    to="/biens/ajouter"
                    className="btn btn-lg bg-[#19355C] hover:bg-[#0f2340] text-white border-none gap-2 w-full sm:w-auto"
                >
                    <RiAddLine className="text-xl" />
                    Ajouter un bien
                </Link>
            </div>

            {isLoading && <p className="text-[#434652]">Chargement...</p>}
            {isError && <p className="text-error">Impossible de charger vos propriétés pour le moment.</p>}

            {properties && properties.length === 0 && (
                <div className="bg-white border border-dashed border-[#DEE3E8] rounded-2xl p-10 text-center">
                    <p className="font-bold text-[#19355C]">Aucun bien pour le moment</p>
                    <p className="text-[#434652] text-sm mt-1">Ajoutez votre premier bien pour commencer à gérer votre patrimoine.</p>
                </div>
            )}

            {properties && properties.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};