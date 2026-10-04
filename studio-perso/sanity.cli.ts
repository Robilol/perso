import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '65s5qkds',
    dataset: 'production',
  },
  deployment: {
    // Studio hébergé sur https://perso.sanity.studio
    appId: 'ntdfh58qmyopvuktk7iq98bd',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
  // `npm run typegen` : types des requêtes GROQ du site (sanity/queries.ts) → sanity/types.ts
  typegen: {
    path: '../sanity/**/*.ts',
    schema: './schema.json',
    generates: '../sanity/types.ts',
  },
})
