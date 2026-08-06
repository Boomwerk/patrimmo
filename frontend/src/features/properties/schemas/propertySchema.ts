import { z } from "zod";

export const PROPERTY_TYPES = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "studio", label: "Studio" },
    { value: "local_commercial", label: "Local commercial" },
    { value: "parking", label: "Parking" },
] as const;

export const CreatePropertySchema = z.object({
    name: z.string().min(1, "Le nom du bien est requis").max(255, "Le nom ne doit pas dépasser 255 caractères"),
    address: z.string().min(1, "L'adresse est requise").max(255, "L'adresse ne doit pas dépasser 255 caractères"),
    city: z.string().min(1, "La ville est requise").max(100, "La ville ne doit pas dépasser 100 caractères"),
    zipCode: z.string().min(1, "Le code postal est requis").max(10, "Le code postal ne doit pas dépasser 10 caractères"),
    country: z.string().min(1, "Le pays est requis").max(100, "Le pays ne doit pas dépasser 100 caractères"),
    type: z.enum(PROPERTY_TYPES.map((t) => t.value) as [string, ...string[]], {
        message: "Le type de bien est requis",
    }),
    surface: z.coerce.number().positive("La surface doit être supérieure à 0"),
    rooms: z.coerce.number().int("Le nombre de pièces doit être un nombre entier").positive("Le nombre de pièces doit être supérieur à 0"),
    rentAmout: z.coerce.number().min(0, "Le montant du loyer ne peut pas être négatif"),
    chargesAmount: z.coerce.number().min(0, "Le montant des charges ne peut pas être négatif"),
    description: z.string().optional(),
    isAvailable: z.boolean(),
});

export type CreatePropertyFormInput = z.input<typeof CreatePropertySchema>;
export type CreatePropertyData = z.output<typeof CreatePropertySchema>;