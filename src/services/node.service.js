import Node from '../models/node.model.js'

export async function updateOneNodeService (query, newData) {
  return await Node.findOneAndUpdate(query, { $set: newData })
}

export async function findNodesFromDevice (idDevice) {
  const nodes = await Node.find({ idDevice }).select(['uid', 'name', 'type', 'value', 'status', 'updatedAt'])
  return { status: 200, data: nodes }
}
