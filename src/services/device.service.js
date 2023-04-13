import Device from '../models/device.model.js'

export async function findDevicesService (query) {
  return (await Device.find(query)).join()
}

export async function findDevicesNodesService (query) {
  const devices = await Device.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: 'nodes',
        localField: '_id',
        foreignField: 'idDevice',
        as: 'nodes',
        pipeline: [
          {
            $project: { _id: 1, name: 1, type: 1, value: 1, status: 1 }
          }
        ]
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        model: 1,
        status: 1,
        nodes: 1
      }
    }
  ])
  return devices
}
