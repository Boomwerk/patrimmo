import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema, type UpdatePasswordData } from "../schemas/SettingUserSchemas";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

export const PasswordForm = () => {

    const { mutate: updatePassword, isPending, isSuccess, isError } = useUpdatePassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdatePasswordData>({
        resolver: zodResolver(UpdatePasswordSchema),
    });

    const onSubmit = (data: UpdatePasswordData) => {
        updatePassword(data, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 sm:px-10 pb-5">
                    <div className="flex flex-col">
                        <p className="font-bold">Mot de passe</p>
                        <p className="text-xs text-black/30">Modifiez votre mot de passe ici</p>
                    </div>
                    <button type="submit" disabled={isPending} className="btn btn-primary btn-lg w-full sm:w-auto">
                        {isPending ? "Enregistrement..." : "Sauvegarder les changements"}
                    </button>
                </div>

                {isSuccess && (
                    <p className="px-4 sm:px-10 text-success text-sm mb-3">Votre mot de passe a été mis à jour.</p>
                )}
                {isError && (
                    <p className="px-4 sm:px-10 text-error text-sm mb-3">Une erreur est survenue, veuillez réessayer.</p>
                )}

                <hr className="text-base-100 my-5"/>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-10">
                    <p className="font-bold">Mot de passe actuel</p>
                    <fieldset className="fieldset w-full sm:w-96">
                        <input type="password" className="input w-full" placeholder="••••••••" {...register("oldPassword")} />
                        {errors.oldPassword && <p className="text-error text-xs">{errors.oldPassword.message}</p>}
                    </fieldset>
                </div>

                <hr className="text-base-100 my-5"/>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-10">
                    <p className="font-bold">Nouveau mot de passe</p>
                    <fieldset className="fieldset w-full sm:w-96">
                        <input type="password" className="input w-full" placeholder="••••••••" {...register("newPassword")} />
                        {errors.newPassword && <p className="text-error text-xs">{errors.newPassword.message}</p>}
                    </fieldset>
                </div>

                <hr className="text-base-100 my-5"/>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-10">
                    <p className="font-bold">Confirmer le mot de passe</p>
                    <fieldset className="fieldset w-full sm:w-96">
                        <input type="password" className="input w-full" placeholder="••••••••" {...register("confirmPassword")} />
                        {errors.confirmPassword && <p className="text-error text-xs">{errors.confirmPassword.message}</p>}
                    </fieldset>
                </div>

            </div>

        </form>
    );
};
