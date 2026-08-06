import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar bg-[#F5F8FC]/90 backdrop-blur sticky top-0 z-50 px-6 lg:px-16">
            <div className="flex-1">
                <Link to="/" className="font-bold text-[20px] text-[#19355C]">
                    PATRIMMO
                </Link>
            </div>

            <div className="hidden lg:flex gap-8 text-[#434652] font-medium text-sm">
                <a href="#fonctionnalites" className="hover:text-[#19355C] transition-colors">Biens</a>
                <a href="#securite" className="hover:text-[#19355C] transition-colors">Sécurité</a>
                <a href="#tarifs" className="hover:text-[#19355C] transition-colors">Tarifs</a>
            </div>

            <div className="flex-none gap-3">
                <Link to="/connexion" className="link link-hover text-[#434652] font-medium text-sm px-2">
                    Connexion
                </Link>
                <Link to="/inscription" className="btn btn-sm bg-[#19355C] hover:bg-[#0f2340] text-white border-none">
                    Créer un compte
                </Link>
            </div>
        </div>
    );
};