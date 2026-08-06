import { RiBarChart2Line, RiCompasses2Line, RiShieldKeyholeLine, RiTeamLine } from "react-icons/ri";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

const avatars = [
    { initials: "ML", bg: "bg-[#9FF5C1]" },
    { initials: "JD", bg: "bg-[#A3BDEC]" },
    { initials: "SR", bg: "bg-[#19355C]" },
];

export const Features = () => {
    return (
        <AnimatedSection id="fonctionnalites" className="bg-[#F5F8FC] px-6 lg:px-16 py-24 lg:py-32">
            <div className="max-w-6xl mx-auto">
                <AnimatedItem className="mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#19355C]">
                        L'Ingénierie de votre Succès
                    </h2>
                    <p className="text-[#434652] mt-3">
                        Des outils de pointe pour une gestion patrimoniale sans compromis.
                    </p>
                </AnimatedItem>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <AnimatedItem
                        id="securite"
                        className="lg:col-span-3 bg-white border border-[#DEE3E8] rounded-2xl p-8 flex flex-col justify-between gap-6 min-h-55"
                    >
                        <div>
                            <RiShieldKeyholeLine className="text-3xl text-[#19355C]" />
                            <h3 className="text-xl font-bold text-[#19355C] mt-4">Sécurité de Rang Bancaire</h3>
                            <p className="text-[#434652] text-sm mt-2 max-w-sm">
                                Vos données et transactions sont protégées par des protocoles de
                                chiffrement de niveau bancaire et une infrastructure redondante.
                            </p>
                        </div>
                    </AnimatedItem>

                    <AnimatedItem className="lg:col-span-2 bg-[#19355C] rounded-2xl p-8 flex flex-col justify-between gap-6 min-h-55 relative overflow-hidden">
                        <RiBarChart2Line className="absolute -bottom-4 -right-4 text-[140px] text-white/5" />
                        <div className="relative">
                            <RiBarChart2Line className="text-3xl text-[#9FF5C1]" />
                            <h3 className="text-xl font-bold text-white mt-4">Analyses de Précision</h3>
                            <p className="text-[#A3BDEC] text-sm mt-2">
                                Anticipez la rentabilité de votre parc immobilier grâce à des rapports
                                détaillés et automatisés.
                            </p>
                        </div>
                        <span className="relative text-xs font-semibold tracking-widest text-[#9FF5C1]">
                            DONNÉES EN TEMPS RÉEL
                        </span>
                    </AnimatedItem>

                    <AnimatedItem className="lg:col-span-2 bg-white border border-[#DEE3E8] rounded-2xl p-8 flex flex-col justify-between gap-6 min-h-55">
                        <div>
                            <RiTeamLine className="text-3xl text-[#19355C]" />
                            <h3 className="text-xl font-bold text-[#19355C] mt-4">Relation Locataire</h3>
                            <p className="text-[#434652] text-sm mt-2">
                                Interface fluide pour vos locataires, centralisant paiements, documents
                                et demandes.
                            </p>
                        </div>
                        <div className="flex -space-x-2">
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar.initials}
                                    className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#19355C]`}
                                >
                                    {avatar.initials}
                                </div>
                            ))}
                        </div>
                    </AnimatedItem>

                    <AnimatedItem className="lg:col-span-3 bg-[#19355C] rounded-2xl p-8 flex flex-col justify-center gap-4 min-h-55 relative overflow-hidden">
                        <RiCompasses2Line className="absolute -top-8 -right-8 text-[160px] text-white/5" />
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-white">Maîtrise Totale.</h3>
                            <p className="text-[#A3BDEC] text-sm mt-3 max-w-md">
                                De l'automatisation des quittances au reporting, chaque fonctionnalité
                                est pensée pour optimiser la gestion de votre patrimoine.
                            </p>
                        </div>
                    </AnimatedItem>
                </div>
            </div>
        </AnimatedSection>
    );
};