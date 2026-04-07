# Guide utilisateur

Ce document explique simplement comment utiliser le site côté client et côté admin.

## 1. Se connecter

- Ouvrez la page d’accueil du site.
- Cliquez sur `Login`.
- Saisissez votre e-mail et votre mot de passe.
- Une fois connecté, vous accédez à votre espace utilisateur ou à l’espace admin si votre compte le permet.

## 2. Découvrir les produits

### Depuis la page d’accueil
- Les catégories principales sont visibles directement sur la page d’accueil.
- Cliquez sur une catégorie pour voir les produits associés.

### Depuis la boutique
- Allez dans `Shop` pour parcourir tous les produits.
- Utilisez le filtre par catégorie si vous cherchez un type de produit précis.
- Cliquez sur un produit pour ouvrir sa fiche détaillée.

## 3. Consulter une fiche produit

Sur la page d’un produit, vous pouvez:
- lire la description,
- voir le prix et le stock,
- consulter les avis des autres utilisateurs,
- ajouter le produit au panier,
- laisser un avis si vous êtes connecté.

## 4. Gérer le panier

- Ouvrez `Cart` pour voir vos articles.
- Modifiez la quantité avec les boutons `+` et `-`.
- Supprimez un article si nécessaire.
- Quand votre panier est prêt, cliquez sur `Checkout`.

Au moment de la commande, vous devez renseigner:
- l’adresse de livraison,
- l’adresse de facturation.

## 5. Suivre son compte

Dans `Account`, vous pouvez:
- modifier vos informations personnelles,
- consulter vos commandes,
- suivre l’historique de vos achats.

## 6. Se déconnecter

- Cliquez sur `Logout` dans le menu.
- Vous revenez à l’écran de connexion.

## 7. Espace admin

Si votre compte est de type `ADMIN`, un menu supplémentaire apparaît.

### Vous pouvez alors:
- créer un produit,
- modifier un produit,
- supprimer un produit,
- renseigner le prix, le stock, l’image et la catégorie.

### Accès rapide
- `Admin` : tableau de bord admin
- `Admin Products` : gestion des produits

## 8. Pages principales

- `/` : accueil
- `/shop` : boutique
- `/product/:id` : fiche produit
- `/cart` : panier
- `/account` : compte utilisateur
- `/login` : connexion
- `/register` : inscription
- `/admin` : espace administrateur
- `/admin/products` : gestion des produits

## 9. Règles simples à retenir

- Un utilisateur non connecté peut consulter le site, mais pas valider certaines actions protégées.
- Le panier, le compte et l’espace admin nécessitent une session active.
- Les comptes admin ont accès aux fonctions de gestion.
