import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {render, screen} from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import userEvent from '@testing-library/user-event';


const createWrapper = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            mutations:{
                retry: false
            }
        }
    });

     return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

describe('RegisterForm', () => {

    it('affiche tous les champs du formulaire', () => {

        render(<RegisterForm />, { wrapper: createWrapper() });

        expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('john@exemple.fr')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /créer mon compte/i})).toBeInTheDocument();


    });
    

    it('affiche les erreurs si le formulaire est soumis vide', async () => {
        const user = userEvent.setup();
        render(<RegisterForm/>, {wrapper: createWrapper()});

        await user.click(screen.getByRole('button', { name: /créer mon compte/i}));

        expect(await screen.findByText('Prénom requis.')).toBeInTheDocument();
        expect(await screen.findByText('Nom requis')).toBeInTheDocument();
        expect(await screen.findByText('Email requis')).toBeInTheDocument();
        expect(await screen.findByText('Minimum 8 caractères.')).toBeInTheDocument();
    })

    it('affiche une erreur si l\'email est invalide', async () => {
        const user = userEvent.setup();

        render(<RegisterForm/>, {wrapper: createWrapper()});

        await user.type(screen.getByPlaceholderText('john@exemple.fr'), 'emailinvalide');
        await user.click(screen.getByRole('button', { name: /créer mon compte/i }));
    

         expect(await screen.findByText('Email invalide')).toBeInTheDocument();
    })


});