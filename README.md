# robin-regis.fr

Portfolio de Robin Regis, développeur full-stack freelance : réalisations, études de cas, services, parcours et contact.
Design néo-brutaliste épuré, contenu entièrement géré dans Sanity.

## Stack

- **Next.js 16** (App Router, Server Components, ISR) · **React 19** · **TypeScript 6**
- **Tailwind CSS 4** (tokens dans `app/globals.css`) · polices Archivo (étendue pour les titres) et JetBrains Mono
- **Sanity 6** : Studio dans `studio-perso/`, contenu lu côté serveur avec `@sanity/client`, types générés par TypeGen
- **EmailJS** pour le formulaire de contact, **Vercel Analytics**

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
| **Profil**        | Accroche, disponibilité, chiffres clés, présentation, compétences, CV (PDF), coordonnées, SEO |
| **Réalisations**  | Carte (résumé, stack, type, ordre, mise en avant) et étude de cas (`/realisations/<slug>`)  |
| **Expériences**   | Poste, entreprise, années, contexte, réalisations, stack                                    |
| **Services**      | Offres affichées dans « Comment je peux vous aider »                                        |
| **Formations**    | Diplômes                                                                                    |
| **Témoignages**   | Section affichée dès qu’un témoignage est publié                                           |

Une réalisation sans étude de cas renvoie vers son site en ligne ; dès que le champ « Étude de cas » est rempli,
la carte mène à la page dédiée, qui est ajoutée au sitemap.

Les documents « Informations personnelles » et « Filtres de portfolio » (rubrique *Ancien site*) ne servent plus :
ils pourront être supprimés une fois la nouvelle version en ligne.

## Mise à jour des pages

Les pages sont statiques et régénérées au plus tard toutes les heures. Pour une mise à jour immédiate à chaque
publication, créer un webhook dans [sanity.io/manage](https://www.sanity.io/manage) → API → Webhooks :

- **URL** : `https://www.robin-regis.fr/api/revalidate`
- **Déclencheurs** : création, mise à jour, suppression
- **Filtre** : `_type in ["profile", "project", "jobExperience", "service", "educationalBackground", "clientReview"]`
- **Projection** : `{_type}`
- **Secret** : une valeur aléatoire, à reporter dans la variable `SANITY_REVALIDATE_SECRET` sur Vercel
