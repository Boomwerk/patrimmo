import { RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

const plans = [
    {
        name: "Essentiel",
        price: "49€",
        highlighted: false,
        features: ["Jusqu'à 5 biens", "Rapports de base", "Gestion des baux"],
        cta: "Choisir Essentiel",
    },
    {
        name: "Privilège",
        price: "99€",
        highlighted: true,
        features: [
            "Jusqu'à 20 biens",
            "Analyses avancées",
            "Support prioritaire 24/7",
            "Export comptable",
        ],
        cta: "Choisir Privilège",
    },
    {
        name: "Souverain",
        price: "199€",
        highlighted: false,
        features: [
            "Biens illimités",
            "Accompagnement dédié",
            "Accès API complet",
            "Rapports personnalisés",
        ],
        cta: "Contacter les Ventes",
    },
];

export const Pricing = () => {
    return (
        <AnimatedSection id="tarifs" className="bg-white px-6 lg:px-16 py-24 lg:py-32">
            <div className="max-w-6xl mx-auto">
                <AnimatedItem className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#19355C]">
                        Investissez dans votre Excellence
                    </h2>
                    <p className="text-[#434652] mt-3">
                        Des forfaits adaptés à l'envergure de vos ambitions.
                    </p>
                </AnimatedItem>

                <div className="grid sm:grid-cols-3 gap-6 items-start">
                    {plans.map((plan) => (
                        <AnimatedItem
                            key={plan.name}
                            className={
                                plan.highlighted
                                    ? "rounded-2xl bg-[#19355C] p-8 shadow-xl sm:-translate-y-4 relative"
                                    : "rounded-2xl bg-white border border-[#DEE3E8] p-8"
                            }
                        >
                            {plan.highlighted && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-[#9FF5C1] text-[#19355C] border-none font-semibold text-xs px-3">
                                    RECOMMANDÉ
                                </span>
                            )}

                            <h3 className={plan.highlighted ? "font-bold text-white" : "font-bold text-[#19355C]"}>
                                {plan.name}
                            </h3>
                            <p className={plan.highlighted ? "text-3xl font-bold text-white mt-2" : "text-3xl font-bold text-[#19355C] mt-2"}>
                                {plan.price}
                                <span className={plan.highlighted ? "text-sm font-normal text-[#A3BDEC]" : "text-sm font-normal text-[#434652]"}>
                                    /mois
                                </span>
                            </p>

                            <ul className="flex flex-col gap-2 mt-6">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className={
                                            plan.highlighted
                                                ? "flex items-center gap-2 text-sm text-[#A3BDEC]"
                                                : "flex items-center gap-2 text-sm text-[#434652]"
                                        }
                                    >
                                        <RiCheckLine className={plan.highlighted ? "text-[#9FF5C1]" : "text-[#19355C]"} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/inscription"
                                className={
                                    plan.highlighted
                                        ? "btn btn-block mt-8 bg-[#9FF5C1] hover:bg-[#8de6b0] text-[#19355C] border-none font-bold"
                                        : "btn btn-block mt-8 btn-outline border-[#DEE3E8] text-[#19355C] hover:bg-[#19355C] hover:text-white hover:border-[#19355C]"
                                }
                            >
                                {plan.cta}
                            </Link>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};