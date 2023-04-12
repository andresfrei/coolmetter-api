import Link from '../models/link.model.js'

export async function createLinkService (payload) {
  const link = await Link.create({ payload })
  const idLink = link._id.toString()
  return { status: 201, data: { idLink } }
}

export async function findLinkService (id) {
  const link = await Link.findById(id)
  if (!link) return { status: 404, data: { message: 'invalid link' } }
  const { payload } = link
  link.delete()
  return { status: 200, data: payload }
}
