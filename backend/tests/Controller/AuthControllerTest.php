<?php

namespace App\Test\Controller;

use App\Factory\UserFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class AuthControllerTest extends WebTestCase{

    use ResetDatabase;
    use Factories;

    private const LOGIN_URI = "http://localhost:8000/api/login";


    public function testLoginReturnsTokenWithValidCredentials(): void
    {
        $client = static::createClient();

        UserFactory::createOne([
                'email' => "test@patrimmo.fr",
                'password' => "Azerty123456!!!",
            ]);

        $client->request(
            'POST',
            self::LOGIN_URI,
            [],
            [],
            ['CONTENT_TYPE' =>'application/json'],
            json_encode([
                'email' => "test@patrimmo.fr",
                'password' => "Azerty123456!!!",
            ])
        );

        $this->assertResponseIsSuccessful();
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);
        $this->assertNotEmpty($data['token']);

    }


    public function testLoginFailesWithUnknowEmail(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            self::LOGIN_URI,
            [],
            [],
            ['CONTENT_TYPE' =>'application/json'],
            json_encode([
                'email' => "test@patrimmo.fr",
                'password' => "Azerty123456!!!",
            ])
        );

        $this->assertResponseStatusCodeSame(401);
    }


    public function testLoginFailsWithWrongPassword(): void 
    {

        $client = static::createClient();

        UserFactory::createOne([
            'email' => "test@patrimmo.fr",
            'password' => "Azerty123456!!!",
        ]);


        $client->request(
            'POST',
            self::LOGIN_URI,
            [],
            [],
            ['CONTENT_TYPE' =>'application/json'],
            json_encode([
                'email' => "test@patrimmo.fr",
                'password' => "BadPassword!!!",
            ])
        );

        $this->assertResponseStatusCodeSame(401);

    }

    public function testLoginFailsWithEmptyBody(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            self::LOGIN_URI,
            [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([])
        );

        $this->assertResponseStatusCodeSame(400);
    }

}