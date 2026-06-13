<?php

namespace App\Service;

use App\DTO\RegisterRequestDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
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

}