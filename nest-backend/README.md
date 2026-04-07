# Backend NestJS

API du projet e-commerce. Elle gère l’authentification, les produits, le panier, les commandes et les avis.

## Prérequis

- Node.js 20 ou supérieur
- npm
- une base de données MariaDB/MySQL accessible

## Installation

```bash
cd nest-backend
npm install
```

## Variables d’environnement

Créer un fichier `.env` à la racine de `nest-backend` avec au minimum:

```env
DATABASE_URL=mysql://root:root@127.0.0.1:3310/archi-logiciel
PORT=3000
SESSION_SECRET=your_secret_key

DB_PORT=3310
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=archi-logiciel
```

### Rôle des variables

- `DATABASE_URL` est utilisé par Prisma.
- `PORT` définit le port HTTP de l’API.
- `SESSION_SECRET` sert à signer la session utilisateur.
- `DB_PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` servent au moteur Prisma MariaDB utilisé par l’application et par le seed.

## Prisma

### Récupérer et appliquer les migrations

```bash
npx prisma migrate dev
```

### Générer le client

```bash
npx prisma generate
```

### Lancer le seed

```bash
npm run seed
```

### Migrations utiles

```bash
npx prisma migrate dev --name description
npx prisma migrate status
npx prisma migrate reset
npx prisma studio
```

## Lancer le projet
### Mode développement

```bash
npm run start:dev
```

### Mode production

```bash
npm run build
npm run start:prod
```


## Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Architecture logicielle

### 1. Decorator

Le projet NestJS repose fortement sur les décorateurs TypeScript et Nest:
- `@Controller()` pour déclarer les routes HTTP
- `@Get()`, `@Post()`, `@Patch()`, `@Delete()` pour les endpoints
- `@UseGuards()` pour protéger les routes
- `@Injectable()` pour les services, use cases et repositories
- `@Module()` pour organiser les dépendances par domaine

Exemple concret:
- les contrôleurs d’authentification, de produits, de panier, de commandes et d’avis utilisent ces décorateurs pour exposer l’API
- `ValidationPipe` active la validation automatique des DTO

### 2. Singleton

NestJS instancie les providers une seule fois par défaut dans le conteneur d’injection. Dans ce projet, cela s’applique notamment à:
- `PrismaService`
- les use cases injectés dans les modules
- les repositories injectés via les providers Nest

Concrètement, cela évite de recréer plusieurs connexions ou services pour chaque requête et garde un état cohérent dans l’application.

### 3. Repository

Le troisième bloc le plus pertinent ici est le pattern Repository.

Les modules métier exposent des interfaces côté application, puis branchent une implémentation Prisma côté infrastructure:
- `AuthRepositoryInterface` -> `PrismaAuthRepository`
- `ProductRepositoryInterface` -> `PrismaProductRepository`
- `BasketRepositoryInterface` -> `PrismaBasketRepository`
- `OrderRepositoryInterface` -> `PrismaOrderRepository`
- `AddressRepositoryInterface` -> `PrismaAddressRepository`
- `IReviewRepository` -> `PrismaReviewRepository`

Intérêt:
- isoler la logique métier de l’accès base de données
- faciliter les tests
- garder le code plus lisible et remplaçable

## Fonctionnement global

- L’API écoute par défaut sur `http://localhost:3000`
- Swagger est disponible sur `http://localhost:3000/api/swagger`
- Les sessions utilisateur sont gérées avec `express-session`
- Les routes protégées utilisent `SessionAuthGuard`

## Routes principales

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `GET /auth/logout`
- `PATCH /auth`

### Produits

- `GET /products`
- `GET /products/categories`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`

### Panier

- `GET /basket`
- `POST /basket/add`
- `PATCH /basket/update-quantity`
- `DELETE /basket/remove/:productId`

### Commandes

- `POST /orders/create`
- `GET /orders/user`
- `GET /orders/:id`

### Avis

- `POST /reviews/product/:productId`
- `GET /reviews/product/:productId`
- `GET /reviews/product/:productId/average`
- `GET /reviews/user/:userId`

## Structure rapide

- `src/auth`: authentification et gestion du compte
- `src/product`: produits et catégories
- `src/basket`: panier
- `src/order`: commandes et adresses
- `src/review`: avis
- `src/shared`: base commune, filtre d’erreur et Prisma
- `prisma/`: schéma, migrations et seed

## Remarques

- Le backend utilise Prisma avec MariaDB/MySQL.
- Les catégories sont peuplées via le seed.
- Si tu changes la base ou les variables `.env`, pense à relancer `npx prisma generate`.
