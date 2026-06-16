<?php

namespace App\Message;

class SendVerificationEmailMessage
{

    public function __construct(private string $userId)
    {
    }


    public function getUserId(): string
    {
        return $this->userId;
    }

    

}