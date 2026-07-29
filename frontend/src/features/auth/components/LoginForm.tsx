import { useForm } from "react-hook-form";
import { loginSchema, type loginFormData } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { isAxiosError } from "axios";


export const LoginForm = () => {

    const {mutate: login, isSuccess, isPending, isError, error} = useLogin();

    const {
        register:loginField,
        handleSubmit,
        formState: {errors}
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onLogin = (data: loginFormData) =>{

        login(data);
    } 


    if(isSuccess){
        return;
    }



    return (
        <form action="" className="py-10" noValidate onSubmit={handleSubmit(onLogin)}>
            {isError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {isAxiosError(error) && error.response?.status === 401? 'Email ou mot de passe incorrect.': 'Une erreur est survenue, veuillez réessayer.'}
                    
                </div>
            )}

            <div>
                <label htmlFor="" className="block text-sm font-medium text-gray-700">E-mail</label>
                <input 
                    type="email" 
                    placeholder="johndoe@exemple.fr" 
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]" 
                    {...loginField('email')}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}

            </div>
            <div className="flex flex-col py-5">
                <label htmlFor="">Mot de passe</label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    {...loginField('password')}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

        

            <button type="submit" className="mt-5 py-3 w-full bg-[#19355C] text-[#F3F5F7] font-bold">
                {isPending ? "Chargement ..." : "Accéder à mon espace"}
            </button>


        </form>
    )
} 