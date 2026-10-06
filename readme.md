# Application Web de Contact - Todisoa

Cette application web moderne et responsive affiche les informations de contact de Todisoa Stagiaire DSID avec un design élégant utilisant Bootstrap, des icônes Font Awesome, et des fonctionnalités interactives.

## Fonctionnalités
- **Design responsive** : Adapté aux mobiles et ordinateurs
- **Icônes et couleurs** : Interface moderne avec Bootstrap et Font Awesome
- **Liens cliquables** : Téléphone, WhatsApp, e-mail
- **Boutons de copie** : Copier facilement les informations dans le presse-papiers
- **Animations** : Effets visuels pour une meilleure expérience utilisateur
- **Photo de profil** : Affichage de la photo personnelle
- **Carte de visite recto-verso** : Impression des coordonnées essentielles avec QR code au recto et logo du ministère au verso

## Carte de visite et intitulé professionnel

L'icône d'imprimante de la page d'accueil ouvre `print-card.html`. Imprimez les deux pages en recto-verso, en retournant sur le bord long. Le QR code dirige vers le site pour consulter les coordonnées complètes.

L'intitulé professionnel est centralisé dans `contact-profile.js` et réutilisé par la page, la vCard et la carte imprimable. En l'absence de source institutionnelle accessible pour détecter automatiquement un changement de statut, mettez à jour les valeurs `role` dans ce fichier ; les différents affichages reprendront alors le nouvel intitulé sans modification séparée.

## Contenu
- **Contacts** : Numéros de téléphone avec liens d'appel
- **WhatsApp** : Lien direct vers WhatsApp
- **E-mails** : Liens mailto avec boutons de copie
- **Facebook** : Noms de profils avec boutons de copie

## Technologies utilisées
- HTML5
- CSS3 avec Bootstrap 5
- JavaScript (ES6)
- Font Awesome pour les icônes

## Comment rendre l'application en ligne

1. **Pousser le code sur GitHub** :
   - Assurez-vous que ce dossier est un dépôt Git lié à un repository GitHub.
   - Si ce n'est pas le cas, initialisez Git : `git init`
   - Ajoutez les fichiers : `git add .`
   - Commitez : `git commit -m "Amélioration de l'application de contact"`
   - Poussez sur GitHub : `git push origin main` (ou master selon la branche par défaut)

2. **Activer GitHub Pages** :
   - Allez sur votre repository GitHub.
   - Cliquez sur "Settings" > "Pages".
   - Sélectionnez la branche (main ou master) et le dossier "/" (root).
   - Sauvegardez.
   - L'application sera accessible à l'URL : `https://<votre-nom-utilisateur>.github.io/<nom-du-repo>/`

## Aperçu local
Pour tester localement, ouvrez `index.html` dans un navigateur web moderne (Chrome, Firefox, etc.).

Ou utilisez un serveur local :
- Avec Python (si installé) : `python -m http.server 8000`
- Puis ouvrez http://localhost:8000 dans votre navigateur.

## Compatibilité
- Navigateurs modernes supportant ES6 et Clipboard API
- Responsive sur tous les appareils