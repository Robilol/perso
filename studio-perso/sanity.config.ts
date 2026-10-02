import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {LEGACY_TYPES, SINGLETON_TYPES, schemaTypes} from './schemaTypes'
import {structure} from './structure'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Perso',

  projectId: '65s5qkds',
  dataset: 'production',

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
    // Pas de création de profil ou d'ancien contenu depuis le menu « Créer »
    templates: (templates) =>
      templates.filter(
        ({schemaType}) => !SINGLETON_TYPES.has(schemaType) && !LEGACY_TYPES.has(schemaType),
      ),
  },

  document: {
    // Le profil ne peut être ni dupliqué ni supprimé
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
})
