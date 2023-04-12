import Link from '../models/link.model.js'

export async function createLinkService (url) {
  const link = await Link.create({ url })
  const idLink = link._id.toString()
  return { status: 201, data: { idLink } }
}

export async function findLinkService (id) {
  const link = await Link.findByIdAndDelete(id)
  if (!link) return { status: 404, data: { message: 'invalid link' } }
  const { url } = link
  // link.delete()
  return { status: 200, data: { url } }
}
