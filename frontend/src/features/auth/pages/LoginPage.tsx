import { Link } from 'react-router-dom';
import building from '../../../assets/login/building-facade.png';
import { LoginForm } from '../components/LoginForm';



export const LoginPage = () => {


    



    return (
        <div className="flex flex-col lg:flex-row min-h-screen size-full">

            <div className="hidden lg:flex lg:w-1/2 p-10 lg:p-20 bg-cover bg-center bg-no-repeat flex-col justify-between" style={{backgroundImage: `url(${building})`}}>
                <p className='font-bold font-sans text-[25px] text-[#A3BDEC]'>PATRIMMO</p>

                <div>
                    <h1 className='text-white text-3xl xl:text-[40px] py-3 font-bold'>L'outil indispensable du propriétaire moderne</h1>
                    <hr className='w-20 bg-[#9FF5C1] h-1 my-5' />
                    <p className='text-[#A3BDEC]'>Accédez à votre espace privé. Pilotez votre patrimoine immobilier avec la précision d'un professionnel et la sérénité d'une plateforme conçue pour les propriétaires exigeants.</p>
                </div>

                <div className='flex gap-3 text-[#405775]'>
                    <p>Gestion immobilier </p>
                    <p> - </p>
                    <p>Automatisation quittance de loyer</p>
                </div>

            </div>
            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col justify-center">
                <div className='py-10'>

                    <h2 className='font-bold text-[25px] text-[#19355C]'>Heureux de vous revoir !</h2>
                    <p className='text-[#434652]'>Veuillez saisir vos identifiants pour accéder à votre espace de gestion.</p>
                </div>

                <hr />

                <LoginForm/>

                <p className='text-[#434652] text-center'>Pas de compte ? <Link to="/inscription" className='text-blue-600 font-bold'>S'inscrire</Link></p>
            </div>



        </div>
    )
} 