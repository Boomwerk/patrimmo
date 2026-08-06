import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CreatePropertySchema, PROPERTY_TYPES, type CreatePropertyData, type CreatePropertyFormInput } from "../schemas/propertySchema";
import { useCreateProperty } from "../hooks/useCreateProperty";
import { getErrorMessage } from "../utils/getErrorMessage";

const StatField = ({
    label,
    suffix,
    error,
    ...inputProps
}: {
    label: string;
    suffix: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="bg-[#F5F8FC] rounded-2xl p-4">
        <p className="text-[10px] font-bold tracking-widest text-[#405775] uppercase">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <input
                type="number"
                step="0.01"
                className="bg-transparent text-2xl font-bold text-[#19355C] w-full outline-none min-w-0"
                {...inputProps}
            />
            <span className="text-sm text-[#434652] shrink-0">{suffix}</span>
        </div>
        {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
);

export const PropertyForm = () => {
    const navigate = useNavigate();
    const { mutate: createProperty, isPending, isError, error } = useCreateProperty();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePropertyFormInput, unknown, CreatePropertyData>({
        resolver: zodResolver(CreatePropertySchema),
        defaultValues: {
            isAvailable: true,
        },
    });

    const onSubmit = (data: CreatePropertyData) => {
        createProperty(data, {
            onSuccess: () => navigate("/biens"),
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {isError && (
                <p className="text-error text-sm">
                    {getErrorMessage(error, "Une erreur est survenue, veuillez réessayer.")}
                </p>
            )}

            <div className="bg-white border border-[#DEE3E8] rounded-2xl p-6 sm:p-8">
                <div className="flex gap-3 mb-6">
                    <div className="w-1 rounded-full bg-[#19355C]" />
                    <div>
                        <h2 className="text-xl font-bold text-[#19355C]">Détails de l'Actif</h2>
                        <p className="text-sm text-[#434652]">Saisissez les informations fondamentales de votre nouveau bien.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <fieldset className="fieldset">
                        <label className="text-sm font-bold text-[#19355C] mb-1">Nom de la propriété</label>
                        <input type="text" className="input w-full" placeholder="ex: Résidence Haussmann" {...register("name")} />
                        {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="text-sm font-bold text-[#19355C] mb-1">Catégorie</label>
                        <select className="select w-full" defaultValue="" {...register("type")}>
                            <option value="" disabled>Sélectionnez un type</option>
                            {PROPERTY_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        {errors.type && <p className="text-error text-xs mt-1">{errors.type.message}</p>}
                    </fieldset>
                </div>

                <fieldset className="fieldset mt-5">
                    <label className="text-sm font-bold text-[#19355C] mb-1">Adresse</label>
                    <input type="text" className="input w-full" placeholder="12 Avenue Montaigne" {...register("address")} />
                    {errors.address && <p className="text-error text-xs mt-1">{errors.address.message}</p>}
                </fieldset>
            </div>

            <div className="bg-white border border-[#DEE3E8] rounded-2xl p-6 sm:p-8">
                <div className="flex gap-3 mb-6">
                    <div className="w-1 rounded-full bg-[#19355C]" />
                    <div>
                        <h2 className="text-xl font-bold text-[#19355C]">Indicateurs Financiers &amp; Espace</h2>
                        <p className="text-sm text-[#434652]">Configurez les paramètres de rentabilité et de surface.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatField label="Loyer mensuel" suffix="€" placeholder="0.00" error={errors.rentAmout?.message} {...register("rentAmout")} />
                    <StatField label="Charges" suffix="€" placeholder="0.00" error={errors.chargesAmount?.message} {...register("chargesAmount")} />
                    <StatField label="Surface" suffix="m²" placeholder="0" error={errors.surface?.message} {...register("surface")} />
                    <StatField label="Pièces" suffix="" placeholder="0" step="1" error={errors.rooms?.message} {...register("rooms")} />
                </div>
            </div>

            <div className="bg-white border border-[#DEE3E8] rounded-2xl p-6 sm:p-8">
                <div className="flex gap-3 mb-6">
                    <div className="w-1 rounded-full bg-[#19355C]" />
                    <div>
                        <h2 className="text-xl font-bold text-[#19355C]">Informations complémentaires</h2>
                        <p className="text-sm text-[#434652]">Localisation précise et disponibilité du bien.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                    <fieldset className="fieldset">
                        <label className="text-sm font-bold text-[#19355C] mb-1">Ville</label>
                        <input type="text" className="input w-full" placeholder="Paris" {...register("city")} />
                        {errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="text-sm font-bold text-[#19355C] mb-1">Code postal</label>
                        <input type="text" className="input w-full" placeholder="75008" {...register("zipCode")} />
                        {errors.zipCode && <p className="text-error text-xs mt-1">{errors.zipCode.message}</p>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="text-sm font-bold text-[#19355C] mb-1">Pays</label>
                        <input type="text" className="input w-full" placeholder="France" {...register("country")} />
                        {errors.country && <p className="text-error text-xs mt-1">{errors.country.message}</p>}
                    </fieldset>
                </div>

                <fieldset className="fieldset mt-5">
                    <label className="text-sm font-bold text-[#19355C] mb-1">Description (optionnel)</label>
                    <textarea className="textarea w-full" rows={3} placeholder="Bel appartement lumineux..." {...register("description")} />
                    {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
                </fieldset>

                <div className="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-[#DEE3E8]">
                    <label className="text-sm font-bold text-[#19355C]">Disponible à la location</label>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked {...register("isAvailable")} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button type="submit" disabled={isPending} className="btn btn-lg bg-[#19355C] hover:bg-[#0f2340] text-white border-none">
                    {isPending ? "Enregistrement..." : "Enregistrer la Propriété"}
                </button>
                <button type="button" onClick={() => navigate("/biens")} className="btn btn-lg btn-ghost text-[#434652]">
                    Annuler
                </button>
            </div>
        </form>
    );
};