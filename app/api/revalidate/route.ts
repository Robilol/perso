import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidateTag } from 'next/cache'

/**
 * Webhook Sanity : régénère les pages dès qu'un document est publié.
 * Configuration (sanity.io/manage → API → Webhooks) : projection `{_type}`, même secret que SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return Response.json(
      { message: 'SANITY_REVALIDATE_SECRET n’est pas configuré' },
      { status: 500 },
    )
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME)
  const body = await request.text()
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: 'Signature invalide' }, { status: 401 })
  }

  let type: unknown
  try {
    type = (JSON.parse(body) as { _type?: unknown })._type
  } catch {
    return Response.json({ message: 'Corps de requête invalide' }, { status: 400 })
  }
  if (typeof type !== 'string' || !type) {
    return Response.json({ message: 'Type de document manquant' }, { status: 400 })
  }

  // Expiration immédiate : la prochaine visite affiche le contenu à jour
  revalidateTag(type, { expire: 0 })
  return Response.json({ revalidated: type })
}
