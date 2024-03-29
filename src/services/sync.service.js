import { Types } from 'mongoose'
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

export async function syncHashService (hash, { name, model, firmware, nodes }) {
  if (!hash || !nodes) return res.invalidQuery
  const sync = await Sync.findOne({ hash })
  if (!sync) return res.invalidData
  const { idAccount } = sync
  const uidNodes = nodes.map(node => node.uid)
  const newDevice = await Device.create({ idAccount, name, model, firmware, nodes: uidNodes })
  const idDevice = newDevice._id
  const newNodes = nodes.map(node => {
    return { idAccount, idDevice, ...node }
  })
  Node.insertMany(newNodes)
  sync.delete()
  const nodeList = nodes.map(node => node.uid)
  const token = await createToken({ idAccount, idDevice, nodes: nodeList })
  return { status: 200, data: { idAccount, idDevice, token } }
}

export async function reSyncService (idAccount, idDevice) {
  if (!idAccount || !idDevice) return res.invalidQuery
  const _id = Types.ObjectId(idDevice)
  const device = await Device.findOne({ _id, idAccount })
  if (!device) return res.invalidData
  const nodes = await Node.find({ idAccount, idDevice })
  const nodesList = nodes.map(node => node.uid)
  const token = await createToken({ idAccount, idDevice, nodes: nodesList })
  return { status: 200, data: { token } }
}
