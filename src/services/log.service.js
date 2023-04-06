// import { productResponse } from '../config/messageResponse.js'
import Log from '../models/log.model.js'
import msg from '../config/messajesResponses.js'
import { updateOneNodeService } from './node.service.js'
const { created } = msg

export async function createLogService ({ idAccount, idDevice }, data) {
  const logs = data.map(node => {
    const { uid, value } = node
    updateOneNodeService({ idAccount, idDevice, uid }, { value })
    return { idDevice, uid, value }
  })
  Log.insertMany(logs)
  return created
}
