<?php


namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;


#[Assert\Expression(
    "this.newPassword === this.confirmPassword",message:"Les mots de passes ne correspondent pas."    
)]
class UpdatePasswordUserDTO {

    #[Assert\NotBlank(message:"L'email est obligatoire.")]
    #[Assert\Length(min:8, minMessage:"Le mot de passe doit contenir au moins 8 caractères.")]
    public $oldPassword = "";

    #[Assert\NotBlank(message:"L'email est obligatoire.")]
    #[Assert\Length(min:8, minMessage:"Le mot de passe doit contenir au moins 8 caractères.")]
    public $newPassword = "";

    #[Assert\NotBlank(message:"L'email est obligatoire.")]
    #[Assert\Length(min:8, minMessage:"Le mot de passe doit contenir au moins 8 caractères.")]
    public $confirmPassword = "";


    

}