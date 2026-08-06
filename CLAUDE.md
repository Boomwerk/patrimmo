# Patrimo — CLAUDE.md

SaaS de gestion de patrimoine immobilier. Backend Symfony 7 (API), frontend React/TypeScript. Développé en solo par un dev freelance avec ~4 ans d'XP (Symfony/React), en visant des pratiques niveau entreprise (Git flow pro, tests, sécurité).

## Stack & structure

**Backend** — Symfony 7, API Platform ou contrôleurs REST classiques, LexikJWTAuthenticationBundle, Symfony Messenger (traitement async : mails de vérification, notifications), Foundry pour les fixtures/factories de tests.

**Frontend** — React + TypeScript, architecture feature-based (`src/features/<domaine>/`), Zustand (state global), React Query / TanStack Query (state serveur), Zod (validation de schémas), route guards pour les routes protégées, Axios avec intercepteurs.

Toujours vérifier la structure réelle du repo avant de supposer un chemin de fichier — ne pas halluciner l'arborescence.

## Conventions de code

**Symfony**
- Controllers fins : logique métier dans des Services, pas dans les controllers.
- DTO en entrée/sortie d'API plutôt que d'exposer directement les entités Doctrine.
- Validation via les Constraints Symfony côté back, cohérente avec les schémas Zod côté front.
- Un Voter pour toute logique d'autorisation non triviale (pas de `if ($user->getId() === ...)` dispersé).
- Messages Messenger asynchrones pour tout ce qui peut être différé (mails, exports, calculs lourds).

**React**
- Un dossier par feature : `components/`, `hooks/`, `api/`, `types/`, `store/` locaux à la feature.
- Hooks custom pour toute logique réutilisable (pas de duplication de `useEffect`).
- Les appels API passent par React Query, jamais de fetch direct dans un composant.
- Props typées strictement, pas de `any`.

**Général**
- Commits atomiques, messages en Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`).
- Une branche par feature/fix, PR même en solo (discipline de revue).
- Pas de secret, token ou clé API en dur dans le code — variables d'environnement uniquement.

## Git flow

Projet en phase pré-V1, pas encore de prod.

- `main` : réservée à la V1 stabilisée. Rien n'y est mergé avant la fin de la V1.
- `develop` : branche d'intégration actuelle. Toutes les PR de feature/fix partent d'une branche dédiée (`feature/xxx`, `fix/xxx`) et sont mergées ici après revue.
- Une fois la V1 terminée sur `develop` : merge unique de `develop` vers `main`, qui marquera le vrai début du suivi "production" (tags de version, changelog, etc.).

Claude Code ne doit jamais proposer de push ou merge direct sur `main` tant que la V1 n'est pas déclarée terminée par l'utilisateur, même si une tâche semble "prête pour la prod". En cas de doute sur la branche cible d'une PR, demander plutôt que de supposer.

## Authentification (état actuel)

- JWT + refresh tokens implémentés côté back.
- Vérification d'email via Messenger (envoi async).
- Flow d'auth React complet : login, register, refresh, guards de route.

**Dette technique connue à traiter avant prod** : le refresh token est actuellement stocké en `localStorage` côté front. À migrer vers un cookie `HttpOnly` + `Secure` + `SameSite` pour éviter l'exposition aux attaques XSS. Ne pas proposer de solution qui contourne ce point sans le signaler explicitement.

## Tests

- Backend : PHPUnit + Foundry (factories) pour les tests fonctionnels et unitaires. Toute nouvelle route API doit avoir un test minimal (cas nominal + cas d'erreur/permission).
- Frontend : pas encore de suite de tests en place — MSW envisagé pour mocker les appels API. Ne pas supposer l'existence de tests si aucun n'est trouvé dans le repo.

## Commandes utiles

```bash
# Backend
symfony serve --no-tls
php bin/console doctrine:migrations:migrate
php bin/phpunit

# Frontend
npm run dev
npm run build
npm run lint
```

Vérifier dans `composer.json` / `package.json` que ces commandes existent réellement avant de les exécuter — ne pas les tenir pour acquises si le projet évolue.

## Comportement attendu de Claude sur ce projet

- Lire ce fichier et l'existant du code avant de proposer une implémentation.
- Pour toute tâche non triviale (nouvelle route API, refonte d'un composant, changement de modèle de données) : d'abord un plan court (fichiers touchés, approche), puis exécution — pas de gros diff surprise.
- Signaler explicitement tout écart avec les conventions ci-dessus plutôt que de les casser silencieusement.
- Ne jamais committer/pousser sans confirmation explicite.
- En cas d'ambiguïté sur une décision d'architecture (ex. où placer une règle métier), poser la question plutôt que trancher silencieusement.

## Prochaine tâche en cours

Implémentation de l'endpoint `PATCH /api/me` (mise à jour du profil utilisateur) : DTO de mise à jour partielle, validation, contrôle que l'utilisateur ne modifie que son propre profil, tests associés.
