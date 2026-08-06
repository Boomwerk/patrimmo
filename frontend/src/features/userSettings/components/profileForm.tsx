import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingUserSchema, type SettingUserdata } from "../schemas/SettingUserSchemas";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { getErrorMessage } from "../utils/getErrorMessage";

export const ProfileForm = () => {

    const { data: user, isLoading: isLoadingUser } = useProfile();
    const { mutate: updateProfile, isPending, isSuccess, isError, error } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SettingUserdata>({
        resolver: zodResolver(SettingUserSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone ?? "",
            });
        }
    }, [user, reset]);

    const onSubmit = (data: SettingUserdata) => {
        updateProfile(data);
    };

    if (isLoadingUser) {
        return <p className="px-10">Chargement...</p>;
    }

    return (
        <form className="" onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className="flex flex-col">
                <div className="flex justify-between items-center px-10 pb-5">
                    <div className="flex flex-col">
                        <p className=" font-bold">Information Personnel</p>
                        <p className="text-xs text-black/30">Mettez a jours vos informations personnels ainsi que votre photo ici </p>

                    </div>
                    <button type="submit" disabled={isPending} className="btn btn-primary btn-lg">
                        {isPending ? "Enregistrement..." : "Sauvegarder les changements"}
                    </button>
                </div>

                {isSuccess && (
                    <p className="px-10 text-success text-sm mb-3">Vos informations ont été mises à jour.</p>
                )}
                {isError && (
                    <p className="px-10 text-error text-sm mb-3">{getErrorMessage(error, "Une erreur est survenue, veuillez réessayer.")}</p>
                )}

                <hr className="text-base-100 my-5"/>

                <div className="flex justify-between items-center px-10">


                    <p className="font-bold">Nom / Prénom</p>

                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-10 mt-5">
                            <fieldset className="fieldset w-120">
                                <input type="text" className="input w-full" placeholder="Prénom" {...register("firstName")} />
                                {errors.firstName && <p className="text-error text-xs">{errors.firstName.message}</p>}
                            </fieldset>
                            <fieldset className="fieldset w-120">
                                <input type="text" className="input w-full" placeholder="Nom" {...register("lastName")} />
                                {errors.lastName && <p className="text-error text-xs">{errors.lastName.message}</p>}
                            </fieldset>
                        </div>
                    </div>
                </div>

                <hr className="text-base-100 my-5"/>


                <div className="my-5 flex justify-between items-center px-10">

                    <p  className="font-bold">Email</p>

                    <div className="flex flex-col gap-1">
                        <label className="input validator w-250">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="Exemple@mail.com" {...register("email")} />
                        </label>
                        {errors.email && <p className="text-error text-xs">{errors.email.message}</p>}
                    </div>
                </div>

                <hr className="text-base-100 my-5" />

                <div className="flex justify-between items-center px-10">
                    <p  className="font-bold">Téléphone (Optionnel)</p>

                    <div className="flex flex-col gap-1">
                        <label className="input validator w-250 ">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <g fill="none">
                                <path
                                d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                                fill="currentColor"
                                ></path>
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                                fill="currentColor"
                                ></path>
                            </g>
                            </svg>
                            <input
                                type="tel"
                                className="tabular-nums"
                                placeholder="06 00 00 00 00"
                                {...register("phone")}
                            />
                        </label>
                        {errors.phone && <p className="text-error text-xs">{errors.phone.message}</p>}
                    </div>
                </div>

            </div>

        </form>

    )
}
