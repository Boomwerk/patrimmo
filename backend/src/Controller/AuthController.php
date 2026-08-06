<?php

namespace App\Controller;

use App\DTO\RegisterRequestDTO;
use App\Message\SendVerificationEmailMessage;
use App\Repository\UserRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;

final class AuthController extends AbstractController
{
    public function __construct(
        private UserService $userService,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private MessageBusInterface $bus,
        private UserRepository $userRepository,
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        
        $dto = $this->serializer->deserialize($request->getContent(), RegisterRequestDTO::class, 'json');
        
        $errors = $this->validator->validate($dto);

        if($errors->count() > 0)
        {

            $errorMessages = [];

            foreach($errors as $error){


                $errorMessages[$error->getPropertyPath()] = $error->getMessage();


            }

            return $this->json(['errors' => $errorMessages], Response::HTTP_UNPROCESSABLE_ENTITY);
        }


        try {
        
            $user = $this->userService->register($dto);
            
            $this->bus->dispatch(new SendVerificationEmailMessage($user->getId()));
           
            return $this->json(['message' => 'Compte créé avec succès, vérifiez votre email.',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                ]], Response::HTTP_CREATED);

        }catch(\InvalidArgumentException $e){
            
            return $this->json(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }

    }


    #[Route("/api/verify", name: 'api_verify_email', methods: ['GET'])]
    public function verifyEmail(Request $request): JsonResponse
    {
        $token = $request->query->get('token');

        if(!$token){
            return $this->json(["error" => 'Token manquant.'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy(["verificationToken" => $token]);

        if(!$user){
            return $this->json(["error" => 'Token invalide.'], Response::HTTP_NOT_FOUND);
        }

        if($user->getVerificationTokenAt() < new \DateTimeImmutable()){
            return $this->json(["error" => 'Token expiré.'], Response::HTTP_GONE);
        }

        if($user->isVerified()){
            return $this->json(["error" => 'Token déjà vérifié.'], Response::HTTP_OK);
        }

        $user->setIsVerified(true);
        $user->setEmailVerifiedAt(new \DateTimeImmutable());
        $user->setVerificationToken(false);
        $user->setVerificationTokenAt(null);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(["message" => 'Email vérifié avec succès.'], Response::HTTP_OK);


    }

    #[Route("/api/me", name:"api_me", methods:["GET"])]
    public function me()  
    {
        $user = $this->getUser();

        if(!$user instanceof User){
            return $this->json(["error" => "Non authentifié"], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "firstName" => $user->getFirstname(),
            "lastName" => $user->getLastName(),
            "phone" => $user->getPhone(),
            'roles' => $user->getRoles()

        ]);

    }
}
