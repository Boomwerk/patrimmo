import {z} from "zod";


export const SettingUserSchema = z.object({
    lastName: z.string().min(2,"Nom requis").max(20,"Nom invalide"),
    firstName: z.string().min(2,"Prénom requis").max(20, "Prénom invalide"),
    email: z.string().min(1, "Email requis").email("Email invalide."),
    phone: z
        .string()
        .optional()
        .refine(
            (value) => !value || (value.length >= 10 && value.length <= 20),
            "Le numéro de téléphone doit contenir entre 10 et 20 chiffres."
        )
});

export type SettingUserdata = z.infer<typeof SettingUserSchema>

export const UpdatePasswordSchema = z.object({
    oldPassword: z.string().min(8, "Le mot de passe actuel doit contenir au moins 8 caractères."),
    newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z.string().min(8, "La confirmation doit contenir au moins 8 caractères."),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>

