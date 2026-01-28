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
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            (action) =>
              action?.name && !['create', 'duplicate'].includes(action.name)
          )
        : input,
    newDocumentOptions: (prev, context) =>
      singletonTypes.has(context.schemaType) ? [] : prev,
  },
})
