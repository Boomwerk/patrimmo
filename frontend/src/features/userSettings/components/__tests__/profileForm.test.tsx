import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { ProfileForm } from '../profileForm';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { authService } from '../../../auth/services/authService';

vi.mock('../../../auth/services/authService', () => ({
    authService: {
        me: vi.fn(),
    },
}));

const createWrapper = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
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

describe('ProfileForm', () => {

    beforeEach(() => {
        vi.mocked(authService.me).mockResolvedValue({
            id: '1',
            email: 'john@exemple.fr',
            firstName: 'John',
            lastName: 'Doe',
            phone: '0600000000',
            roles: ['ROLE_OWNER'],
        });
    });

    it('affiche et pré-remplit tous les champs du formulaire', async () => {

        render(<ProfileForm />, { wrapper: createWrapper() });

        expect(await screen.findByPlaceholderText('Prénom')).toHaveValue('John');
        expect(screen.getByPlaceholderText('Nom')).toHaveValue('Doe');
        expect(screen.getByPlaceholderText('Exemple@mail.com')).toHaveValue('john@exemple.fr');
        expect(screen.getByPlaceholderText('06 00 00 00 00')).toHaveValue('0600000000');
        expect(screen.getByRole('button', { name: /sauvegarder les changements/i })).toBeInTheDocument();
    });

    it('affiche les erreurs si le formulaire est soumis vide', async () => {
        const user = userEvent.setup();
        render(<ProfileForm />, { wrapper: createWrapper() });

        await screen.findByPlaceholderText('Prénom');
        await user.clear(screen.getByPlaceholderText('Prénom'));
        await user.clear(screen.getByPlaceholderText('Nom'));
        await user.clear(screen.getByPlaceholderText('Exemple@mail.com'));

        await user.click(screen.getByRole('button', { name: /sauvegarder les changements/i }));

        expect(await screen.findByText('Prénom requis')).toBeInTheDocument();
        expect(await screen.findByText('Nom requis')).toBeInTheDocument();
        expect(await screen.findByText('Email requis')).toBeInTheDocument();
    });

});
