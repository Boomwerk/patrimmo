import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const navLinks = [
    { href: "#fonctionnalites", label: "Biens" },
    { href: "#securite", label: "Sécurité" },
    { href: "#tarifs", label: "Tarifs" },
];

export const Navbar = () => {
    return (
        <div className="navbar bg-[#F5F8FC]/90 backdrop-blur sticky top-0 z-50 px-4 sm:px-6 lg:px-16">
            <div className="flex-1 flex items-center gap-2">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-square text-[#19355C]" aria-label="Ouvrir le menu">
                        <RiMenuLine className="text-xl" />
                    </div>
                    <ul className="menu dropdown-content fixed inset-x-0 top-16 w-screen bg-[#F5F8FC] rounded-none z-1 p-4 shadow gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="text-[#434652] font-medium">{link.label}</a>
                            </li>
                        ))}
                        <li>
                            <Link to="/connexion" className="text-[#434652] font-medium">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/inscription" className="text-[#19355C] font-bold">Créer un compte</Link>
                        </li>
                    </ul>
                </div>

                <Link to="/" className="font-bold text-[20px] text-[#19355C]">
                    PATRIMMO
                </Link>
            </div>

            <div className="hidden lg:flex gap-8 text-[#434652] font-medium text-sm">
                {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="hover:text-[#19355C] transition-colors">
                        {link.label}
                    </a>
                ))}
            </div>

            <div className="hidden sm:flex flex-none items-center gap-6 lg:ml-8">
                <Link to="/connexion" className="text-[#434652] font-medium text-sm hover:text-[#19355C] transition-colors">
                    Connexion
                </Link>
                <Link to="/inscription" className="btn btn-sm bg-[#19355C] hover:bg-[#0f2340] text-white border-none">
                    Créer un compte
                </Link>
            </div>
        </div>
    );
};