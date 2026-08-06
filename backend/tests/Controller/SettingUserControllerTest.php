<?php

namespace App\Test\Controller;

use App\Factory\UserFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class SettingUserControllerTest extends WebTestCase
{
    use ResetDatabase;
    use Factories;

    private const LOGIN_URI = "http://localhost:8000/api/login";
    private const ME_URI = "http://localhost:8000/api/me";
    private const ME_PASSWORD_URI = "http://localhost:8000/api/me/password";

    private function loginAndGetToken($client, string $email, string $password): string
    {
        $client->request(
            'POST',
            self::LOGIN_URI,
            [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => $email,
                'password' => $password,
            ])
        );

        $data = json_decode($client->getResponse()->getContent(), true);

        return $data['token'];
    }

    public function testUpdateUserPersistsChangesInDatabase(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'update@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'update@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'PATCH',
            self::ME_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode([
                'email' => 'update@patrimmo.fr',
                'firstName' => 'Jean',
                'lastName' => 'Dupont',
                'phone' => '0600000000',
            ])
        );

        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);

        self::ensureKernelShutdown();
        $client2 = static::createClient();
        $client2->request(
            'GET',
            'http://localhost:8000/api/me',
            [], [],
            ['HTTP_AUTHORIZATION' => 'Bearer ' . $data['token']]
        );

        $this->assertResponseIsSuccessful();
        $me = json_decode($client2->getResponse()->getContent(), true);
        $this->assertSame('Jean', $me['firstName']);
        $this->assertSame('Dupont', $me['lastName']);
        $this->assertSame('0600000000', $me['phone']);
    }

    public function testUpdateUserFailsWithEmailAlreadyUsed(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'taken@patrimmo.fr',
        ]);

        UserFactory::createOne([
            'email' => 'me@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'me@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'PATCH',
            self::ME_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode([
                'email' => 'taken@patrimmo.fr',
                'firstName' => 'Jean',
                'lastName' => 'Dupont',
            ])
        );

        $this->assertResponseStatusCodeSame(500);
    }

    public function testUpdateUserFailsWithoutAuthentication(): void
    {
        $client = static::createClient();

        $client->request(
            'PATCH',
            self::ME_URI,
            [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'anon@patrimmo.fr',
                'firstName' => 'Jean',
                'lastName' => 'Dupont',
            ])
        );

        $this->assertResponseStatusCodeSame(401);
    }

    public function testUpdatePasswordPersistsNewPassword(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'password@patrimmo.fr',
            'password' => 'OldPassword123!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'password@patrimmo.fr', 'OldPassword123!!!');

        $client->request(
            'PATCH',
            self::ME_PASSWORD_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode([
                'oldPassword' => 'OldPassword123!!!',
                'newPassword' => 'NewPassword456!!!',
                'confirmPassword' => 'NewPassword456!!!',
            ])
        );

        $this->assertResponseIsSuccessful();

        self::ensureKernelShutdown();
        $client2 = static::createClient();

        $client2->request(
            'POST',
            self::LOGIN_URI,
            [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'password@patrimmo.fr',
                'password' => 'NewPassword456!!!',
            ])
        );

        $this->assertResponseIsSuccessful();
        $data = json_decode($client2->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);
    }

    public function testUpdatePasswordFailsWithWrongOldPassword(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'wrongold@patrimmo.fr',
            'password' => 'OldPassword123!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'wrongold@patrimmo.fr', 'OldPassword123!!!');

        $client->request(
            'PATCH',
            self::ME_PASSWORD_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode([
                'oldPassword' => 'BadOldPassword!!!',
                'newPassword' => 'NewPassword456!!!',
                'confirmPassword' => 'NewPassword456!!!',
            ])
        );

        $this->assertResponseStatusCodeSame(500);
    }

    public function testUpdatePasswordFailsWhenConfirmationDoesNotMatch(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'mismatch@patrimmo.fr',
            'password' => 'OldPassword123!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'mismatch@patrimmo.fr', 'OldPassword123!!!');

        $client->request(
            'PATCH',
            self::ME_PASSWORD_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode([
                'oldPassword' => 'OldPassword123!!!',
                'newPassword' => 'NewPassword456!!!',
                'confirmPassword' => 'DifferentPassword789!!!',
            ])
        );

        $this->assertResponseStatusCodeSame(422);
    }
}
