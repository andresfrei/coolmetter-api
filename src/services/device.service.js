import Device from '../models/device.model.js'

export async function findDevicesService (query) {
  return await Device.find(query)
}
