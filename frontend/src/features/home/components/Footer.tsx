import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-[#F5F8FC] border-t border-[#DEE3E8] px-6 lg:px-16 py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <p className="font-bold text-[#19355C] text-lg">PATRIMMO</p>
                    <p className="text-sm text-[#434652] mt-2 max-w-xs">
                        L'excellence opérationnelle au service de la gestion de votre patrimoine
                        immobilier.
                    </p>
                </div>

                <div className="flex gap-16">
                    <div className="flex flex-col gap-2 text-sm text-[#434652]">
                        <Link to="/mentions-legales" className="hover:text-[#19355C] transition-colors">
                            Mentions légales
                        </Link>
                        <Link to="/cgu" className="hover:text-[#19355C] transition-colors">
                            Conditions d'utilisation
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-[#434652]">
                        <a href="mailto:contact@patrimmo.fr" className="hover:text-[#19355C] transition-colors">
                            Contact
                        </a>
                        <a href="#fonctionnalites" className="hover:text-[#19355C] transition-colors">
                            Fonctionnalités
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-[#DEE3E8] mt-10 pt-6 text-sm text-[#434652]/70">
                © {new Date().getFullYear()} PATRIMMO. Tous droits réservés.
            </div>
        </footer>
    );
};