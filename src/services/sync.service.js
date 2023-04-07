import Sync from '../models/sync.model.js'
import Node from '../models/node.model.js'
import Device from '../models/device.model.js'

import { createToken } from '../lib/token.js'
import res from '../config/messajesResponses.js'

export async function createSyncService (data) {
  const { hash } = data
  const sync = await Sync.findOne({ hash })
  if (sync) return res.isExists
  const newSync = await Sync.create(data)
  return { status: 201, data: newSync }
}

export async function findSyncService (query) {
  const sync = await Sync.findOne(query)
  if (!sync) return res.notFound
  return { status: 200, data: sync }
}

export async function syncHashService (hash, { name, nodes }) {
  if (!hash || !nodes) return res.invalidQuery
  const sync = await Sync.findOne({ hash })
  if (!sync) return res.invalidData
  const { idAccount } = sync
  const newDevice = await Device.create({ idAccount, name })
  const idDevice = newDevice._id
  const newNodes = nodes.map(node => {
    return { idAccount, idDevice, ...node }
  })
  Node.insertMany(newNodes)
  sync.delete()
  const nodeList = nodes.map(node => node.uid)
  const token = await createToken({ idAccount, idDevice, nodes: nodeList })
  return { status: 200, data: { idDevice, token } }
}
