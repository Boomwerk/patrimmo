import { RiCameraAiLine, RiMapPin2Line, RiSparkling2Line } from "react-icons/ri";

export const PropertyAssetPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="border-2 border-dashed border-[#DEE3E8] rounded-2xl bg-white p-8 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#F5F8FC] flex items-center justify-center text-[#19355C] text-2xl">
                    <RiCameraAiLine />
                </div>
                <p className="font-bold text-[#19355C]">Importer des Visuels</p>
                <p className="text-sm text-[#434652] max-w-[220px]">
                    Glissez vos fichiers haute résolution ici ou cliquez pour parcourir votre bibliothèque.
                </p>
                <span className="badge bg-[#F5F8FC] text-[#405775] border-none text-xs font-semibold">
                    MAXIMUM 50MB PAR FICHIER
                </span>
            </div>

            <div className="bg-white border border-[#DEE3E8] rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#19355C] uppercase">
                    <RiSparkling2Line className="text-[#9FF5C1] text-base" />
                    Conseil d'expert
                </div>
                <p className="text-[#434652] text-sm italic mt-3">
                    "Une galerie de photos complète augmente la valeur perçue de vos biens lors des visites."
                </p>
            </div>

            <div className="rounded-2xl bg-[#19355C] p-6 relative overflow-hidden">
                <RiMapPin2Line className="absolute -bottom-4 -right-4 text-[110px] text-white/5" />
                <p className="relative text-xs font-semibold tracking-widest text-[#9FF5C1] uppercase">Localisation</p>
                <p className="relative text-white font-bold mt-1">Aperçu géographique</p>
                <p className="relative text-[#A3BDEC] text-xs mt-2">
                    L'aperçu carte sera disponible une fois l'adresse renseignée.
                </p>
            </div>
        </div>
    );
};