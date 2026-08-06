import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { PasswordForm } from '../passwordForm';
import userEvent from '@testing-library/user-event';

const createWrapper = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: {
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

describe('PasswordForm', () => {

    it('affiche tous les champs du formulaire', () => {

        render(<PasswordForm />, { wrapper: createWrapper() });

        expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(3);
        expect(screen.getByRole('button', { name: /sauvegarder les changements/i })).toBeInTheDocument();
    });

    it('affiche les erreurs si le formulaire est soumis vide', async () => {
        const user = userEvent.setup();
        render(<PasswordForm />, { wrapper: createWrapper() });

        await user.click(screen.getByRole('button', { name: /sauvegarder les changements/i }));

        expect(await screen.findByText('Le mot de passe actuel doit contenir au moins 8 caractères.')).toBeInTheDocument();
        expect(await screen.findByText('Le nouveau mot de passe doit contenir au moins 8 caractères.')).toBeInTheDocument();
    });

    it('affiche une erreur si les mots de passe ne correspondent pas', async () => {
        const user = userEvent.setup();
        render(<PasswordForm />, { wrapper: createWrapper() });

        const [, newPassword, confirmPassword] = screen.getAllByPlaceholderText('••••••••');

        await user.type(newPassword, 'password123');
        await user.type(confirmPassword, 'password456');
        await user.click(screen.getByRole('button', { name: /sauvegarder les changements/i }));

        expect(await screen.findByText('Les mots de passe ne correspondent pas.')).toBeInTheDocument();
    });

});
