<?php

namespace App\Service;

use App\DTO\CreatePropertyDTO;
use App\Entity\Property;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class PropertyService
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {}

    public function createProperty(User $owner, CreatePropertyDTO $dto): Property
    {
        $property = new Property();
        $property
            ->setName($dto->name)
            ->setAddress($dto->address)
            ->setCity($dto->city)
            ->setZipCode($dto->zipCode)
            ->setCountry($dto->country)
            ->setType($dto->type)
            ->setSurface($dto->surface)
            ->setRooms($dto->rooms)
            ->setRentAmout($dto->rentAmout)
            ->setChargesAmount($dto->chargesAmount)
            ->setDescription($dto->description)
            ->setIsAvailable($dto->isAvailable)
            ->setCreatedAt(new \DateTimeImmutable())
            ->setOwner($owner)
        ;

        $this->entityManager->persist($property);
        $this->entityManager->flush();

        return $property;
    }
}