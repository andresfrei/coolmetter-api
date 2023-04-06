import Node from '../models/node.model.js'

export async function updateOneNodeService (query, newData) {
  return await Node.findOneAndUpdate(query, { $set: newData })
}
