<?php

namespace App\Test\Controller;

use App\Factory\UserFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class PropertyControllerTest extends WebTestCase
{
    use ResetDatabase;
    use Factories;

    private const LOGIN_URI = "http://localhost:8000/api/login";
    private const PROPERTIES_URI = "http://localhost:8000/api/properties";

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

    private function validPropertyPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Appartement Centre-Ville',
            'address' => '12 rue de la Paix',
            'city' => 'Lyon',
            'zipCode' => '69000',
            'country' => 'France',
            'type' => 'appartement',
            'surface' => 45.5,
            'rooms' => 2,
            'rentAmout' => '650.00',
            'chargesAmount' => '50.00',
            'description' => 'Bel appartement lumineux.',
            'isAvailable' => true,
        ], $overrides);
    }

    public function testCreatePropertyPersistsInDatabase(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'owner@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'owner@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode($this->validPropertyPayload())
        );

        $this->assertResponseStatusCodeSame(201);

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame('Appartement Centre-Ville', $data['property']['name']);
        $this->assertSame('Lyon', $data['property']['city']);
        $this->assertArrayHasKey('id', $data['property']);
    }

    public function testCreatePropertyFailsWithoutAuthentication(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode($this->validPropertyPayload())
        );

        $this->assertResponseStatusCodeSame(401);
    }

    public function testCreatePropertyFailsWithMissingRequiredFields(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'missing@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'missing@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode($this->validPropertyPayload(['name' => '']))
        );

        $this->assertResponseStatusCodeSame(422);

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('name', $data['error']);
    }

    public function testListPropertiesReturnsOnlyOwnerProperties(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'lister@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        UserFactory::createOne([
            'email' => 'other@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'lister@patrimmo.fr', 'Azerty123456!!!');
        $otherToken = $this->loginAndGetToken($client, 'other@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode($this->validPropertyPayload(['name' => 'Bien du lister']))
        );
        $this->assertResponseStatusCodeSame(201);

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $otherToken,
            ],
            json_encode($this->validPropertyPayload(['name' => 'Bien du other']))
        );
        $this->assertResponseStatusCodeSame(201);

        $client->request(
            'GET',
            self::PROPERTIES_URI,
            [], [],
            ['HTTP_AUTHORIZATION' => 'Bearer ' . $token]
        );

        $this->assertResponseIsSuccessful();
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertCount(1, $data['properties']);
        $this->assertSame('Bien du lister', $data['properties'][0]['name']);
    }

    public function testListPropertiesFailsWithoutAuthentication(): void
    {
        $client = static::createClient();

        $client->request('GET', self::PROPERTIES_URI);

        $this->assertResponseStatusCodeSame(401);
    }

    public function testCreatePropertyFailsWithInvalidType(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
            'email' => 'invalidtype@patrimmo.fr',
            'password' => 'Azerty123456!!!',
            'isVerified' => true,
        ]);

        $token = $this->loginAndGetToken($client, 'invalidtype@patrimmo.fr', 'Azerty123456!!!');

        $client->request(
            'POST',
            self::PROPERTIES_URI,
            [], [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            ],
            json_encode($this->validPropertyPayload(['type' => 'chateau']))
        );

        $this->assertResponseStatusCodeSame(422);

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('type', $data['error']);
    }
}