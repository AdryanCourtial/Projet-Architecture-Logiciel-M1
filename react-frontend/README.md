# Client Frontend

Interface web du projet, pensée pour deux profils:
- client
- admin

Pour la documentation utilisateur du site, voir [DOC_UTILISATEUR.md](DOC_UTILISATEUR.md).

## Présentation

L’application permet de consulter le catalogue, gérer son panier, passer commande et suivre son compte. Les utilisateurs admin disposent en plus d’un accès à la gestion des produits.

## Prérequis

- Node.js 20 ou supérieur
- npm
- accès au backend NestJS

## Installation

```bash
cd react-frontend
npm install
```

## Configuration

Le frontend lit l’URL de l’API via la variable suivante:

```env
VITE_API_URL=http://localhost:3000
```

Si le backend et le frontend tournent sur le même domaine, cette variable peut être omise.

## Démarrage

```bash
npm run dev
```

Autres commandes utiles:

```bash
npm run build
npm run lint
npm run preview
```

## Parcours client

### Accueil
- Découvrir les catégories principales
- Accéder rapidement aux produits

### Boutique
- Parcourir tous les produits
- Filtrer par catégorie
- Ouvrir la fiche d’un produit

### Fiche produit
- Voir le détail du produit
- Lire les avis
- Ajouter le produit au panier
- Ajouter un avis si connecté

### Panier
- Modifier les quantités
- Supprimer un article
- Lancer le checkout
- Valider la commande après saisie des informations de livraison et de facturation

### Compte
- Mettre à jour son profil
- Consulter ses commandes

### Authentification
- Se connecter
- Créer un compte
- Se déconnecter via le menu

## Parcours admin

L’accès admin est réservé aux comptes avec le rôle `ADMIN`.

### Gestion des produits
- Créer un produit
- Modifier un produit
- Supprimer un produit
- Renseigner prix, stock, image et catégorie

### Accès
- Le menu admin apparaît uniquement pour les comptes autorisés
- Les routes protégées redirigent automatiquement si le rôle n’est pas valide

## Routes principales

- `/`: accueil
- `/shop`: boutique
- `/product/:id`: fiche produit
- `/cart`: panier
- `/account`: compte utilisateur
- `/login`: connexion
- `/register`: inscription
- `/admin`: espace admin
- `/admin/products`: gestion des produits

## Fonctionnement technique

- L’application utilise des cookies de session côté backend
- Les requêtes API passent par `axios` avec `withCredentials`
- Le logout appelle `GET /auth/logout`

## Structure rapide

- `src/pages`: pages de l’application
- `src/components`: composants partagés
- `src/auth`: authentification et protection des routes
- `src/products`: catalogue et catégories
- `src/basket`: panier
- `src/orders`: commandes
- `src/reviews`: avis

## Remarques

- Les pages protégées redirigent vers `/login` si l’utilisateur n’est pas connecté
- Les comptes admin sont redirigés vers leur espace après connexion
- Le frontend attend une API compatible avec les routes déjà utilisées par l’application
