import {z} from 'zod';


export const loginSchema = z.object({
    email: z.string()
        .min(1, "Email requis")
        .email("Email invalide."),
    password: z.string()
        .min(8, "Minimum 8 caractères."),
        
});


export type loginFormData = z.infer<typeof loginSchema>;