<?php


namespace App\MessageHandler;


use App\Message\SendVerificationEmailMessage;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class SendVerificationEmailMessageHandler 
{

    public function __construct(
        private UserRepository $userRepository,
        private MailerInterface $mailer,
        private string $appUrl,
        private EntityManagerInterface $entityManager
    )
    {
    }

    public function __invoke(SendVerificationEmailMessage $message): void
    {
        $user = $this->userRepository->find($message->getUserId());
        


        if(!$user || $user->isVerified()){
            return;
        }
            
        $token = bin2hex(random_bytes(32));
        $expiresAt = new \DateTimeImmutable('+24 hours');

        $user->setVerificationToken($token);
        $user->setVerificationTokenAt($expiresAt);
              
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        
        $email = (new TemplatedEmail())
            ->from('noreply@patrimmo.fr')
            ->to($user->getEmail())
            ->subject('Confirmez votre email - Patrimmo')
            ->htmlTemplate('emails/verification.html.twig')
            ->context([
                'user' => $user,
                'token' => $token,
                'url' => $this->appUrl . '/api/verify?token=' . $token
            ]);

        
        $this->mailer->send($email);

    }

}