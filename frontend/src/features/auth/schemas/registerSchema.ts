import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string()
        .min(1, "Email requis")
        .email('Email invalide.'),
    password: z.string()
        .min(8, 'Minimum 8 caractères.')
        .regex(/[A-Z]/, 'Au moins une majuscule')
        .regex(/[0-9]/, 'Au moins un chiffre.')
        .regex(/[^a-zA-Z0-9]/, 'Au moins un caractère spécial'),
    firstName: z.string()
        .min(1, 'Prénom requis.'),
    lastName: z.string()
        .min(1,'Nom requis'),
    phone: z.string().optional()
});

export type RegisterFormData = z.infer<typeof registerSchema>;