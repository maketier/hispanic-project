import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('Ecosystem Page')
        .id('ecosystemPage')
        .child(S.document().schemaType('ecosystemPage').documentId('ecosystemPage')),
      S.listItem()
        .title('Hispanic.k Label Page')
        .id('hispanickLabelPage')
        .child(S.document().schemaType('hispanickLabelPage').documentId('hispanickLabelPage')),
    ])

export const singletonTypes = new Set(['homepage', 'ecosystemPage', 'hispanickLabelPage'])
