<?php

namespace App\Controller;

use App\DTO\CreatePropertyDTO;
use App\Entity\Property;
use App\Entity\User;
use App\Repository\PropertyRepository;
use App\Service\PropertyService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PropertyController extends AbstractController
{
    public function __construct(
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private PropertyService $propertyService,
        private PropertyRepository $propertyRepository
    ) {}

    #[Route("/api/properties", name: "api-properties-list", methods: ["GET"])]
    public function list(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json(["error" => "Non authentifié"], Response::HTTP_UNAUTHORIZED);
        }

        $properties = $this->propertyRepository->findByOwner($user);

        return $this->json([
            "properties" => array_map(
                fn (Property $property) => $this->serializeProperty($property),
                $properties
            ),
        ], Response::HTTP_OK);
    }

    #[Route("/api/properties", name: "api-properties-create", methods: ["POST"])]
    public function create(Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json(["error" => "Non authentifié"], Response::HTTP_UNAUTHORIZED);
        }

        $dto = $this->serializer->deserialize($request->getContent(), CreatePropertyDTO::class, 'json');
        $errors = $this->validator->validate($dto);

        if ($errors->count() > 0) {
            $errorsMessage = [];

            foreach ($errors as $error) {
                $errorsMessage[$error->getPropertyPath()] = $error->getMessage();
            }

            return $this->json(["error" => $errorsMessage], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $property = $this->propertyService->createProperty($user, $dto);
        } catch (\Exception $e) {
            return $this->json(["error" => "Une erreur est survenue."], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "message" => "Bien ajouté avec succès.",
            "property" => $this->serializeProperty($property),
        ], Response::HTTP_CREATED);
    }

    private function serializeProperty(Property $property): array
    {
        return [
            "id" => $property->getId(),
            "name" => $property->getName(),
            "address" => $property->getAddress(),
            "city" => $property->getCity(),
            "zipCode" => $property->getZipCode(),
            "country" => $property->getCountry(),
            "type" => $property->getType(),
            "surface" => $property->getSurface(),
            "rooms" => $property->getRooms(),
            "rentAmout" => $property->getRentAmout(),
            "chargesAmount" => $property->getChargesAmount(),
            "description" => $property->getDescription(),
            "isAvailable" => $property->isAvailable(),
        ];
    }
}