<?php

namespace App\Service;

use App\DTO\RegisterRequestDTO;
use App\DTO\UpdatePasswordUserDTO;
use App\DTO\UpdateUserDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserService
{

    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $entityManager
    ) {}

    public function register(RegisterRequestDTO $dto): User
    {

        $userexist = $this->userRepository->findOneBy(['email' => $dto->email]);
        
        if($userexist !== null)
        {
            throw new \Exception("L'email est déjà utilisé.");
        }

        $user = new User();
        $user->setEmail($dto->email);
        $user->setFirstName($dto->firstName);
        $user->setLastName($dto->lastName);
        $user->setPhone($dto->phone);
        $user->setRoles(['ROLE_OWNER']);
        $user->setIsVerified(false);

        
        $hashedPassword = $this->passwordHasher->hashPassword($user, $dto->password);
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    public function updateUser(User $user,UpdateUserDTO $dto): User 
    {

        $existingUser = $this->userRepository->findOneBy([
            'email' => $dto->email
        ]);

        if ($existingUser && $existingUser !== $user) {
            throw new Exception("Vous ne pouvez pas utilisé cette email");
        }

        $user
            ->setFirstName($dto->firstName)
            ->setLastName($dto->lastName)
            ->setEmail($dto->email)
            ->setPhone($dto->phone)
        ;
        
        $this->entityManager->flush();

        return $user;

        
    }

    public function updateUserPassword(User $user, UpdatePasswordUserDTO $dto): User
    {
        $existingUser = $this->userRepository->findOneBy([
            'email' => $user->getEmail()
        ]);
    
        if(!$existingUser) { throw new \Exception("L'utitlisateur n'existe pas."); }


        if(!$this->passwordHasher->isPasswordValid($user, $dto->oldPassword)){throw new \Exception("Le Mot de passe actuel n'est pas correct !");}

        $user->setPassword($this->passwordHasher->hashPassword($user, $dto->newPassword));

        $this->entityManager->flush();
        
        return $user;
    }

    

}