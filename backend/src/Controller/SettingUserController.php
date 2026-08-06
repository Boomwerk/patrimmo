<?php

namespace App\Controller;

use App\DTO\UpdatePasswordUserDTO;
use App\DTO\UpdateUserDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserService;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SettingUserController extends AbstractController {


    public function __construct(
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private UserService $userService,
        private JWTTokenManagerInterface $jwtManager
    ){}

    #[Route("/api/me", name:"api-me-update", methods:["PATCH"])]
    public function updateUser(Request $request): JsonResponse
    {

        $user= $this->getUser();

        if(!$user instanceof User){
            return $this->json(["error" => "Non Authentifié"], Response::HTTP_UNAUTHORIZED); 
        }
        
  
        $dto = $this->serializer->deserialize($request->getContent(), UpdateUserDTO::class, 'json');
        $errors = $this->validator->validate($dto);

        if($errors->count() > 0){
            $errorsMessage = [];

            foreach( $errors as $error){

              $errorsMessage[$error->getPropertyPath()]   = $error->getMessage();
            }

            return $this->json(["error" => $errorsMessage], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

    
        try{
            $this->userService->updateUser($user,$dto);
        }catch(\Exception $e){
            return $this->json(["error" => "Une erreur est survenue."], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        return $this->json([
            "message" => "Modification réussi",
            "token" => $this->jwtManager->create($user),
        ], Response::HTTP_OK);

    }

    #[Route("/api/me/password", name:"api-me-password", methods:["PATCH"])]
    public function updatePassword(Request $req): JsonResponse
    {
        $user = $this->getUser();

        if(!$user instanceof User){
            return $this->json(["message" => "Non Authentifié !"], Response::HTTP_UNAUTHORIZED);
        }

        
        $dto = $this->serializer->deserialize($req->getContent(), UpdatePasswordUserDTO::class, 'json');

        $errors = $this->validator->validate($dto);

        if($errors->count() > 0){
            $errorsMessage = [];

            foreach($errors as $error){

                $errorsMessage[$error->getPropertyPath()] = $error->getMessage();

            }

            return $this->json(["error" => $errorsMessage], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try
        {
            $this->userService->updateUserPassword($user,$dto);

        }catch(\Exception $e){
            
            return $this->json(["error" => "Une erreur est survenue."], Response::HTTP_INTERNAL_SERVER_ERROR);
        }



        return $this->json(["message" => "Mot de passe modifié avec succès."], Response::HTTP_OK);

    }

}
    