import { Link } from "react-router-dom";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";

export const CtaBanner = () => {
    return (
        <AnimatedSection className="px-6 lg:px-16 py-20 bg-[#F5F8FC]">
            <AnimatedItem className="max-w-6xl mx-auto rounded-3xl bg-[#19355C] px-8 py-12 lg:px-14 lg:py-14 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#9FF5C1]/10" />
                <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full bg-[#A3BDEC]/10" />

                <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            Prêt à changer de dimension ?
                        </h2>
                        <p className="text-[#A3BDEC] mt-3 max-w-lg">
                            Rejoignez le cercle restreint des propriétaires qui privilégient la
                            technologie et la précision pour leur patrimoine.
                        </p>
                    </div>
                    <Link
                        to="/inscription"
                        className="btn btn-lg bg-white hover:bg-[#F5F8FC] text-[#19355C] border-none font-bold whitespace-nowrap"
                    >
                        Démarrer l'Expérience
                    </Link>
                </div>
            </AnimatedItem>
        </AnimatedSection>
    );
};