import { RegisterForm } from "../components/RegisterForm";
import regiserbg from "../../../assets/register/bg-register.jpeg";
import { Link } from "react-router-dom";
import certified from "../../../assets/register/certified.png";
import joris from "../../../assets/register/joris.png";

const RegisterPage = () => {


    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 py-10 px-6 sm:px-10 lg:px-25 xl:px-45">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <p className='font-bold font-sans text-[20px] text-[#19355C]'>PATRIMMO</p>
                    <p className="text-sm text-[#19355C]"> J'ai déjà un compte - <Link to="/connexion" className="font-bold ">Se connecter</Link></p>

                </div>

                <div className="my-10">
                    <h1 className="text-3xl lg:text-[50px] text-bold font-bold font-sans text-[#19355C]">Pilotez votre patrimoine.</h1>
                    <p className="font-sans text-lg lg:text-[30px]">Gérez votre patrimoine immobilier avec précision et confiance.</p>
                </div>


                <RegisterForm />

                <p className="text-sm text-[#434652] mt-5 text-center">En vous inscrivant, vous acceptez nos <Link to="/conditions-d-utilisation">Conditions d'utilisation</Link> et notre <Link to="/politique-de-confidentialite">Politique de confidentialité.</Link></p>



            </div>
            <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-cover bg-center bg-no-repeat justify-center items-end" style={{backgroundImage: `url(${regiserbg})`}}>

                <div className="w-2/3 bg-[#C7C7C9] p-5 rounded my-10">
                    <div className="flex items-center justify-start gap-3 px-5 py-3 w-full">
                        <img src={certified} alt="" className="w-[25px]"/>
                        <p className="font-bold ">Utilisateur Certifié</p>
                    </div>

                    <p className="text-xl px-5 italic">
                        "Patrimmo ne se limite pas à un tableau de bord : il vous offre une gestion claire, centralisée et sereine de votre patrimoine immobilier."
                    </p>


                    <div className="mt-5 flex">
                        <div className="px-5">
                            <img src={joris} alt="" className="w-[50px] rounded" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Joris Aouachria</p>
                            <p className="text-sm">Directeur, Manager, Firas Immobilier</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        


    )
}

export default RegisterPage;