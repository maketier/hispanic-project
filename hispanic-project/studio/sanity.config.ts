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
    // Block singleton types from "Create new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filter document actions for singleton types
    // Uses action.action which is the stable property in Sanity v3
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return input.filter((action) => {
          // action.action is the stable identifier (e.g., 'duplicate', 'delete')
          const actionId = action.action
          return actionId !== 'duplicate' && actionId !== 'delete'
        })
      }
      return input
    },
  },
})
