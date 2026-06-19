

export const RegisterTest = () => {





    return (
        <form action="" className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                   
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John"
                />
                
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                    
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John"
                />
               
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Doe"
                />
                
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@exemple.fr"
                />
                
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
                <input
                    type="tel"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="06 12 34 56 78"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                    type="password"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                />

                 <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
             S'inscrire !
            </button>
                
            </div>
        </form>
    )


} 