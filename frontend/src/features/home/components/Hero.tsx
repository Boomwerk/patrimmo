import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiBarChart2Line } from "react-icons/ri";
import heroSkyline from "../../../assets/home/hero-skyline.jpg";

export const Hero = () => {
    return (
        <div className="bg-[#F5F8FC]">
            <div className="px-6 lg:px-16 pt-16 pb-24 lg:pt-24 lg:pb-32">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-[36px] lg:text-[50px] leading-[1.15] font-bold text-[#19355C]"
                        >
                            La Gestion Immobilière Professionnelle, Réinventée.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-[#434652] text-lg mt-6 max-w-md"
                        >
                            Une plateforme exclusive pour les propriétaires exigeants. Gérez votre
                            patrimoine avec la précision d'un professionnel.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-start gap-4 mt-10"
                        >
                            <Link
                                to="/inscription"
                                className="btn btn-lg bg-[#19355C] hover:bg-[#0f2340] text-white border-none w-full sm:w-auto"
                            >
                                Démarrer maintenant
                            </Link>
                            <Link
                                to="/inscription"
                                className="btn btn-lg btn-outline border-[#DEE3E8] text-[#19355C] hover:bg-[#19355C] hover:text-white hover:border-[#19355C] w-full sm:w-auto"
                            >
                                Voir la démo
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-x-4 -inset-y-4 rounded-4xl border border-[#DEE3E8] rotate-3" />
                        <img
                            src={heroSkyline}
                            alt="Immeubles modernes gérés avec PATRIMMO"
                            className="relative rounded-3xl shadow-2xl w-full h-105 object-cover rotate-2"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl px-5 py-4 w-56"
                        >
                            <div className="flex items-center gap-2 text-xs text-[#434652] font-medium">
                                <RiBarChart2Line className="text-[#19355C]" />
                                Performance Annuelle
                            </div>
                            <p className="text-2xl font-bold text-[#19355C] mt-1">+12.4%</p>
                            <div className="w-full h-1.5 bg-[#DEE3E8] rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "78%" }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="h-full bg-[#9FF5C1]"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};