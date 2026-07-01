import { useForm } from 'react-hook-form';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { useRegister } from '../hooks/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';


export const RegisterForm = () => {
    const { mutate: register, isPending, isSuccess, isError } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        register(data);
    };

    if (isSuccess) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600">Compte créé !</h2>
                <p className="mt-2 text-gray-600">
                    Vérifiez votre email pour activer votre compte.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

            {isError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    Une erreur est survenue, veuillez réessayer.
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                    {...registerField('firstName')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    placeholder="John"
                />
                {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    {...registerField('lastName')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    placeholder="Doe"
                />
                {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    {...registerField('email')}
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    placeholder="john@exemple.fr"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
                <input
                    {...registerField('phone')}
                    type="tel"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    placeholder="06 12 34 56 78"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                    {...registerField('password')}
                    type="password"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#DEE3E8]"
                    placeholder="••••••••"
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 px-4 bg-[#19355C] text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? 'Création en cours...' : 'Créer mon compte'}
            </button>

        </form>
    );
};