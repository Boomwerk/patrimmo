<?php

namespace App\Controller;

use App\DTO\RegisterRequestDTO;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class AuthController extends AbstractController
{
    public function __construct(
        private UserService $userService,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
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

            return $this->json(['message' => 'Compte créé avec succès',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                ]], Response::HTTP_CREATED);

        }catch(\InvalidArgumentException $e){
            
            return $this->json(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }


        return new JsonResponse(['message' => 'Registration endpoint']);    
    }
}
