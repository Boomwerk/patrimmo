<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class CreatePropertyDTO
{
    #[Assert\NotBlank(message: "Le nom du bien est obligatoire.")]
    #[Assert\Length(max: 255, maxMessage: "Le nom ne doit pas dépasser 255 caractères.")]
    public string $name = "";

    #[Assert\NotBlank(message: "L'adresse est obligatoire.")]
    #[Assert\Length(max: 255, maxMessage: "L'adresse ne doit pas dépasser 255 caractères.")]
    public string $address = "";

    #[Assert\NotBlank(message: "La ville est obligatoire.")]
    #[Assert\Length(max: 100, maxMessage: "La ville ne doit pas dépasser 100 caractères.")]
    public string $city = "";

    #[Assert\NotBlank(message: "Le code postal est obligatoire.")]
    #[Assert\Length(max: 10, maxMessage: "Le code postal ne doit pas dépasser 10 caractères.")]
    public string $zipCode = "";

    #[Assert\NotBlank(message: "Le pays est obligatoire.")]
    #[Assert\Length(max: 100, maxMessage: "Le pays ne doit pas dépasser 100 caractères.")]
    public string $country = "";

    #[Assert\NotBlank(message: "Le type de bien est obligatoire.")]
    #[Assert\Choice(
        choices: ["appartement", "maison", "studio", "local_commercial", "parking"],
        message: "Le type de bien sélectionné n'est pas valide."
    )]
    public string $type = "";

    #[Assert\NotBlank(message: "La surface est obligatoire.")]
    #[Assert\Positive(message: "La surface doit être supérieure à 0.")]
    public float $surface = 0;

    #[Assert\NotBlank(message: "Le nombre de pièces est obligatoire.")]
    #[Assert\Positive(message: "Le nombre de pièces doit être supérieur à 0.")]
    public int $rooms = 0;

    #[Assert\NotBlank(message: "Le montant du loyer est obligatoire.")]
    #[Assert\PositiveOrZero(message: "Le montant du loyer ne peut pas être négatif.")]
    public string $rentAmout = "0";

    #[Assert\NotBlank(message: "Le montant des charges est obligatoire.")]
    #[Assert\PositiveOrZero(message: "Le montant des charges ne peut pas être négatif.")]
    public string $chargesAmount = "0";

    public ?string $description = null;

    public bool $isAvailable = true;
}