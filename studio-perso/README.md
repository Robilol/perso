# Studio Sanity — Perso

Studio d’édition du contenu du portfolio (projet `65s5qkds`, dataset `production`).

```bash
npm install
npm run dev       # http://localhost:3333
npm run deploy    # met à jour le Studio hébergé
npm run typegen   # régénère ../sanity/types.ts (schéma + requêtes GROQ du site)
```

- `schemaTypes/` : modèle de contenu (profil, réalisations, expériences, services, formations, témoignages,
  mentions légales)
- `structure.ts` : organisation du Studio ; le **Profil** (`_id: "profile"`) et les **Mentions légales**
  (`_id: "legalNotice"`) sont des documents uniques
- Les types de la rubrique *Ancien site* ne servent qu’à l’ancienne version du site et pourront être supprimés
