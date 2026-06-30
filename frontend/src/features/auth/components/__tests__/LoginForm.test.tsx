import {render, screen} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "../LoginForm";
import userEvent from '@testing-library/user-event';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: {
                retry:false
            }
        }
    });

    return ( {children}: {children: React.ReactNode}) => (
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
        </MemoryRouter>
    )


}


describe("LoginForm", () => {


    it("affiche tous les champs du formulaire", () => {
        const Wrapper = createWrapper();
        render(<LoginForm/>,{ wrapper: Wrapper});

        expect(screen.getByPlaceholderText("johndoe@exemple.fr")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
        expect(screen.getByRole("button",{name: /Accéder à mon espace/i})).toBeInTheDocument();
    });

    it("affiche les erreur si le formulaire est soumis vide", async () => {
        const user = userEvent.setup();
        const Wrapper = createWrapper();

        render(<LoginForm/>, {wrapper: Wrapper});
        
        await user.click(screen.getByRole("button", {name: /Accéder à mon espace/i}));

        expect(await screen.findByText("Email requis")).toBeInTheDocument();
        expect(await screen.findByText("Minimum 8 caractères.")).toBeInTheDocument();


    })

    it("affiche une erreur si l'email est invalide", async () => {
        const user = userEvent.setup();
        const Wrapper = createWrapper();

        render(<LoginForm/>, {wrapper: Wrapper});

        await user.type(screen.getByPlaceholderText("johndoe@exemple.fr"), "emailInvalidelol");
        await user.type(screen.getByPlaceholderText("••••••••"), "testtest!!");
        await user.click(screen.getByRole("button", {name: /Accéder à mon espace/i}))

        expect(await screen.findByText("Email invalide.")).toBeInTheDocument();
    })

    it("affiche une erreur si le mot de passe est incorrect", async () => {
        const user = userEvent.setup();
        const Wrapper = createWrapper();

        render(<LoginForm/>, {wrapper: Wrapper});

        await user.type(screen.getByPlaceholderText("johndoe@exemple.fr"), "johndoe@azert1y.com");
        await user.type(screen.getByPlaceholderText("••••••••"), "Motdepasseincorrect13!");
        await user.click(screen.getByRole("button", {name: /Accéder à mon espace/i}));

        expect(await screen.findByText("Email ou mot de passe incorrect.")).toBeInTheDocument();



    })

})