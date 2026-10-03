# robin-regis.fr

Portfolio de Robin Regis, développeur full-stack freelance : réalisations, études de cas, services, parcours, contact
et mentions légales. Design néo-brutaliste éditorial, contenu entièrement géré dans Sanity.

## Stack

- **Next.js 16** (App Router, Server Components, ISR) · **React 19** · **TypeScript 6**
- **Tailwind CSS 4** (tokens dans `app/globals.css`) · polices Archivo (étendue pour les titres) et JetBrains Mono
- **Sanity 6** : Studio dans `studio-perso/`, contenu lu côté serveur avec `@sanity/client`, types générés par TypeGen
- Formulaire de contact : route `/api/contact` (reCAPTCHA v3 vérifié côté serveur, envoi avec **Resend**),
  **EmailJS** en secours tant que Resend n'est pas configuré · **Vercel Analytics**

## Logos

Le dossier `brand/` contient le logo au format carré (pastille « RR ») et rectangle (pastille, nom et métier),
en SVG (texte vectorisé, sans dépendance aux polices) et en PNG : fond papier, fond transparent, et version sombre
pour le rectangle.

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # facultatif : les identifiants Sanity ont des valeurs par défaut
npm run dev                        # http://localhost:3000
```

Studio Sanity (édition du contenu) :

```bash
cd studio-perso
npm install
npm run dev                        # http://localhost:3333
npm run deploy                     # met à jour le Studio hébergé
```

## Scripts

| Commande            | Rôle                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Serveur de développement                                            |
| `npm run build`     | Build de production (le sitemap et les images Open Graph sont générés par Next.js) |
| `npm run lint`      | ESLint (configuration Next.js)                                      |
| `npm run typecheck` | Vérification TypeScript                                             |
| `npm run typegen`   | Régénère `sanity/types.ts` depuis le schéma du Studio et les requêtes GROQ |
| `npm run knip`      | Détecte le code et les dépendances inutilisés                       |

## Contenu (Sanity)

| Document          | Contenu                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Profil**        | Accroche, disponibilité, chiffres clés, présentation, compétences, méthode de travail, CV (PDF), coordonnées, SEO |
| **Réalisations**  | Carte (résumé, stack, type, ordre, mise en avant) et étude de cas (`/realisations/<slug>`)  |
| **Expériences**   | Poste, entreprise, années, contexte, réalisations, stack                                    |
| **Services**      | Offres de « Comment je peux vous aider » : description, livrables, technologies             |
| **Formations**    | Diplômes                                                                                    |
| **Témoignages**   | Section affichée dès qu’un témoignage est publié                                           |
| **Mentions légales** | Statut, SIRET, adresse, hébergeur et textes (données personnelles, cookies…) de `/mentions-legales` |

Une réalisation sans étude de cas renvoie vers son site en ligne ; dès que le champ « Étude de cas » est rempli,
la carte mène à la page dédiée, qui est ajoutée au sitemap.

Les documents « Informations personnelles » et « Filtres de portfolio » (rubrique *Ancien site*) ne servent plus :
ils pourront être supprimés une fois la nouvelle version en ligne.

## Mise à jour des pages

Les pages sont statiques et régénérées au plus tard toutes les heures. Pour une mise à jour immédiate à chaque
publication, créer un webhook dans [sanity.io/manage](https://www.sanity.io/manage) → API → Webhooks :

- **URL** : `https://www.robin-regis.fr/api/revalidate`
- **Déclencheurs** : création, mise à jour, suppression
- **Filtre** : `_type in ["profile", "project", "jobExperience", "service", "educationalBackground", "clientReview", "legalNotice"]`
- **Projection** : `{_type}`
- **Secret** : une valeur aléatoire, à reporter dans la variable `SANITY_REVALIDATE_SECRET` sur Vercel

## Formulaire de contact

Le formulaire envoie le message à la route `/api/contact`, qui valide les champs, ignore les robots (champ piège),
vérifie le jeton reCAPTCHA v3 auprès de Google (score minimal 0,5) puis envoie l'email avec [Resend](https://resend.com).
Variables à définir sur Vercel :

- `RESEND_API_KEY` : clé API Resend. Sans elle, le formulaire passe par EmailJS depuis le navigateur.
- `RECAPTCHA_SECRET_KEY` : clé secrète reCAPTCHA v3 associée à la clé de site (sans elle, pas de vérification).
- `CONTACT_FROM_EMAIL` (facultatif) : expéditeur sur un domaine vérifié dans Resend, ex. `Portfolio <contact@robin-regis.fr>`.
  Par défaut `onboarding@resend.dev`, qui ne peut écrire qu'à l'adresse du compte Resend.
- `CONTACT_TO_EMAIL` (facultatif) : destinataire, par défaut l'email du profil Sanity.

La réponse au message part directement vers l'adresse du visiteur (`reply_to`).
