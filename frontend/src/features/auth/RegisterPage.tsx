import { RegisterTest } from "./components/RegisterTest";



const RegisterPage = () => {


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Patrimo</h1>
                    <p className="mt-2 text-gray-600">Créez votre compte propriétaire</p>
                </div>
                <RegisterTest />
                <p className="mt-6 text-center text-sm text-gray-600">
                    Déjà un compte ?{' '}
                <a href="/login" className="text-indigo-600 hover:underline font-medium">
                    Se connecter
                </a>
                </p>
            </div>
        </div>


    )
}

export default RegisterPage;