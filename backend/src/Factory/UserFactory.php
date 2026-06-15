<?php

namespace App\Factory;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

final class UserFactory extends PersistentProxyObjectFactory
{

    public function __construct(
        private UserPasswordHasherInterface $hasher
    )
    {
        
    }

    public static function class():string
    {
        return User::class;
        
    }

    protected function defaults(): array
    {
        return [
            'email' => self::faker()->unique()->safeEmail(),
            'firstName' => self::faker()->firstName(),
            'lastName'  => self::faker()->lastName(),
            'phone'     => self::faker()->phoneNumber(),
            'roles'     => [],
            'isVerified' => false,
            'emailVerifiedAt' => new \DateTimeImmutable(),
            'password'  => 'password'
        ];
    }

    protected function initialize(): static
    {
        return $this->afterInstantiate(function(User $user):void
        {
            $user->setPassword(
                $this->hasher->hashPassword($user, $user->getPassword())
            );
        });
    }
}