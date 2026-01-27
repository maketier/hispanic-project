export const runtime = 'nodejs'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const ALLOWED_SLUGS = ['/', '/ecosystem', '/hispanick']

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.DRAFT_MODE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!slug || !ALLOWED_SLUGS.includes(slug)) {
    return new Response('Invalid slug. Allowed: /, /ecosystem, /hispanick', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(slug)
}
