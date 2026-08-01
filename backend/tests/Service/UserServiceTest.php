<?php

namespace App\Tests\Service;

use App\DTO\RegisterRequestDTO;
use App\DTO\UpdateUserDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserServiceTest extends TestCase
{

    private UserService $userService;
    private MockObject $entityManager;
    private MockObject $passwordHasher;
    private MockObject $userRepository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $this->userRepository = $this->createMock(UserRepository::class);

        $this->userService = new UserService(
            $this->userRepository,
            $this->passwordHasher,
            $this->entityManager
        );


    }


    public function testRegisterCreatesUserSuccessfully(): void
    {
        $dto = new RegisterRequestDTO();
        $dto->email = 'test@test.com';
        $dto->password = 'password';
        $dto->firstName = 'John';
        $dto->lastName = 'Doe';
     
        $this->userRepository
            ->expects($this->once())
            ->method('findOneBy')
            ->with(['email' => 'test@test.com'])
            ->willReturn(null);

        $this->passwordHasher
            ->expects($this->once())
            ->method('hashPassword')
            ->willReturn('hashed_password');
        
        $this->entityManager
            ->expects($this->once())
            ->method('persist');
        
        $this->entityManager
            ->expects($this->once())
            ->method('flush');
        

        $user = $this->userService->register($dto);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('test@test.com', $user->getEmail());
        $this->assertEquals('John', $user->getFirstName());
        $this->assertEquals('Doe', $user->getLastName());
        $this->assertEquals('hashed_password', $user->getPassword());

        
    }


    public function testRegisterThrowsExceptionIfEmailAlreadyExists(): void
    {
        $dto = new RegisterRequestDTO();
        $dto->email = 'existing@test.com';
        $dto->password = 'password123';
        $dto->firstName = "John";
        $dto->lastName = 'Doe';

        $this->userRepository
            ->expects($this->once())
            ->method('findOneBy')
            ->with(["email" => 'existing@test.com'])
            ->willReturn(new User())
        ;

         $this->passwordHasher
            ->expects($this->never())
            ->method('hashPassword')
        ;

        $this->entityManager
            ->expects($this->never())
            ->method('persist')
        ;

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("L'email est déjà utilisé.");
        
        $user = $this->userService->register($dto);
        
    }


    public function testRegisterHashesPassword(): void
    {
        $dto = new RegisterRequestDTO();
        $dto->email = 'test2@test.com';
        $dto->password = 'plainPassword!';
        $dto->firstName = "Jane";
        $dto->lastName = "Doe";

        $this->userRepository
            ->expects($this->once())
            ->method("findOneBy")
            ->willReturn(null)
        ;

        $this->passwordHasher
            ->expects($this->once())
            ->method('hashPassword')
            ->willReturn('super_hashed_password')
        ;

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
        ;
        
        $this->entityManager
            ->expects($this->once())
            ->method('flush')
        ;
        
        $user = $this->userService->register($dto);

        $this->assertNotEquals('plainpassword', $user->getPassword());
        $this->assertEquals('super_hashed_password', $user->getPassword());

    }


    public function testUpdateUserFailed()
    {
        $dto = new UpdateUserDTO();
        $dto->firstName = "Prénom";
        $dto->lastName = "NomDeFamille";
        $dto->email = "Test@test.com";
        $dto->phone="+33617682895";

        $user = new User();
        $user->setFirstName("Prénom");
        $user->setLastName("NomDeFamille");
        $user->setEmail("Test@failed.com");
        $user->setPhone("+33617682895");

        $existUser = new User();
        $existUser->setEmail("Test@test.com");


        $this->userRepository->expects($this->once())->method('findOneBy')->willReturn($existUser);

        
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Vous ne pouvez pas utilisé cette email");
        
        $this->userService->updateUser($user,$dto);
        
    }

}