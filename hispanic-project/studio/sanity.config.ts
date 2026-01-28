import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure, singletonTypes } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Hispanic',

  projectId: 'f2p1f7y0',
  dataset: 'production',

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from initial document value templates
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Hide 'duplicate' and 'delete' actions for singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : input,
  },
})

