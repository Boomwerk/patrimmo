<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class RegisterRequestDTO
{

    #[Assert\NotBlank(message:"L'email est obligatoire.")]
    #[Assert\Email(message:"L'email n'est pas valide.")]
    public string $email = "";

    #[Assert\NotBlank(message:"Le mot de passe est obligatoire.")]
    #[Assert\Length(min:8, minMessage:"Le mot de passe doit contenir au moins 8 caractères.")]
    public string $password = "";
    
    #[Assert\NotBlank(message:"Le prénom est obligatoire.")]
    public string $firstName = "";
    
    #[Assert\NotBlank(message:"Le nom est obligatoire.")]
    public string $lastName = "";

    #[Assert\Length(min:10, max:20, minMessage:"Le numéro de téléphone doit contenir au moins 10 chiffres.", maxMessage:"Le numéro de téléphone ne doit pas dépasser 15 chiffres.")]
    public ?string $phone = null;
}