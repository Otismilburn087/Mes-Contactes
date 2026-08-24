Publication (GitHub Pages)

Option A — via GitHub CLI (`gh`) — crée et pousse le dépôt sur GitHub (recommandé si vous avez `gh` configuré) :

```bash
# initialiser le dépôt local si nécessaire
git init
git add .
git commit -m "Initial commit"

# remplacez USERNAME et REPO par vos valeurs
gh repo create USERNAME/REPO --public --source=. --remote=origin --push
```

Option B — via Git classique et création manuelle du repo sur GitHub :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# remplacez l'URL par celle de votre dépôt
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Notes importantes:

- Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) déployera automatiquement la branche `main` vers GitHub Pages après un push.
- Vous n'avez pas besoin d'ajouter de token : GitHub Actions utilise `GITHUB_TOKEN` fourni automatiquement.
- Si vous préférez un domaine personnalisé, ajoutez un fichier `CNAME` à la racine du projet puis poussez.

Si vous voulez, je peux aussi:

- créer un repo GitHub pour vous (il me faudra un jeton ou accès, ce que je ne peux pas faire ici), ou
- préparer un commit et vous fournir la commande exacte pour pousser.
