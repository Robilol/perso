# Migration des données JSON vers Sanity

Ce guide explique comment importer automatiquement toutes vos données JSON existantes dans Sanity.

## Prérequis

1. Un projet Sanity configuré (déjà fait ✅)
2. Un token d'API Sanity avec les permissions d'écriture

## Étapes de migration

### 1. Créer un token d'API Sanity

1. Allez sur https://www.sanity.io/manage/personal/tokens
2. Cliquez sur "Add API token"
3. Donnez un nom au token (ex: "Migration token")
4. Sélectionnez les permissions **"Editor"** ou **"Administrator"**
5. Copiez le token généré

### 2. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `studio-perso` :

```bash
cp .env.example .env
```

Éditez le fichier `.env` et ajoutez votre token :

```env
SANITY_TOKEN=votre_token_ici
```

### 3. Installer les dépendances

```bash
cd studio-perso
npm install
```

### 4. Lancer la migration

```bash
npm run migrate
```

Le script va automatiquement :
- ✅ Importer vos informations personnelles
- ✅ Importer tous vos projets (8 projets)
- ✅ Importer vos services (3 services)
- ✅ Importer vos expériences professionnelles (7 expériences)
- ✅ Importer vos formations (4 formations)
- ✅ Importer vos compétences techniques (12 compétences)
- ✅ Importer vos compétences linguistiques (3 compétences)
- ✅ Importer les filtres de portfolio (4 filtres)
- ✅ Importer les avis clients

### 5. Vérifier les données

Une fois la migration terminée, lancez Sanity Studio :

```bash
npm run dev
```

Ouvrez http://localhost:3333 pour voir toutes vos données importées !

## Notes importantes

### Images

⚠️ **Attention** : Les images ne sont pas automatiquement uploadées dans cette version du script. Elles restent référencées comme chemins de fichiers (`/images/...`).

Pour uploader les images dans Sanity :
1. Option 1 : Uploader manuellement via le Studio
2. Option 2 : Étendre le script pour uploader les images automatiquement (demandez-moi si besoin)

### Données existantes

⚠️ Si vous relancez le script, il créera des **doublons**. Pour éviter cela :
- Supprimez toutes les données dans Sanity Studio avant de relancer
- Ou ajoutez une logique de vérification dans le script

### Singleton (Information)

Le document "information" devrait être unique (singleton). Si vous avez plusieurs documents "information", vous pouvez :
1. Les supprimer manuellement dans le Studio
2. Configurer le schéma comme singleton (demandez-moi si besoin)

## Dépannage

### Erreur "Missing token"
Vérifiez que votre fichier `.env` contient bien le token et qu'il est valide.

### Erreur "Unauthorized"
Votre token n'a pas les bonnes permissions. Créez un nouveau token avec les permissions "Editor" ou "Administrator".

### Le script plante
Vérifiez les logs pour voir quel document pose problème. Vous pouvez commenter temporairement certaines sections du script pour les migrer séparément.
