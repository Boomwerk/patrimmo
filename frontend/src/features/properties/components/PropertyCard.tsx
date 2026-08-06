import { FaRegBuilding } from "react-icons/fa";
import { PROPERTY_TYPES } from "../schemas/propertySchema";
import type { Property } from "../types/property";

const getTypeLabel = (type: string) => PROPERTY_TYPES.find((t) => t.value === type)?.label ?? type;

export const PropertyCard = ({ property }: { property: Property }) => {
    return (
        <div className="bg-white border border-[#DEE3E8] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] flex items-center justify-center text-[#19355C] text-xl shrink-0">
                    <FaRegBuilding />
                </div>
                <span
                    className={
                        property.isAvailable
                            ? "badge bg-[#9FF5C1] text-[#19355C] border-none font-semibold text-xs whitespace-nowrap"
                            : "badge bg-[#DEE3E8] text-[#434652] border-none font-semibold text-xs whitespace-nowrap"
                    }
                >
                    {property.isAvailable ? "Disponible" : "Occupé"}
                </span>
            </div>

            <div>
                <p className="font-bold text-[#19355C] text-lg">{property.name}</p>
                <p className="text-sm text-[#434652]">{property.address}, {property.zipCode} {property.city}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#405775]">
                <span className="badge badge-outline border-[#DEE3E8] text-[#405775]">{getTypeLabel(property.type)}</span>
                <span>{property.surface} m²</span>
                <span>·</span>
                <span>{property.rooms} pièce{property.rooms > 1 ? "s" : ""}</span>
            </div>

            <div className="flex items-end justify-between mt-2 pt-4 border-t border-[#DEE3E8]">
                <div>
                    <p className="text-xs text-[#434652]">Loyer mensuel</p>
                    <p className="text-xl font-bold text-[#19355C]">{property.rentAmout} €</p>
                </div>
                <p className="text-xs text-[#434652]">+ {property.chargesAmount} € charges</p>
            </div>
        </div>
    );
};