let onlineShops = []

export const addNewShop = (shopID, socketId) => {
  !onlineShops.some((shop) => shop.shopID === shopID) &&
    onlineShops.push({ shopID, socketId })
}

const removeShop = (socketId) => {
  onlineShops = onlineShops.filter((shop) => shop.socketId !== socketId)
}

export const getShopOnline = (shopID) => {
  return onlineShops.find((shop) => shop.shopID === shopID)
}

export default (io) => {
  io.on('connection', (socket) => {
    const { shopID } = socket.request.session
    addNewShop(shopID, socket.id)
    console.log('send ID connection')
    io.to(socket.id).emit('message', { auth: socket.id })

    socket.on('sendNotification', ({ senderName, receiverName, type }) => {
      const receiver = getShopOnline(receiverName)
      io.to(receiver.socketId).emit('getNotification', {
        senderName,
        type
      })
    })

    socket.on('sendText', ({ senderName, receiverName, text }) => {
      const receiver = getShopOnline(receiverName)
      io.to(receiver.socketId).emit('getText', {
        senderName,
        text
      })
    })

    socket.on('disconnect', () => {
      removeShop(socket.id)
    })
  })
}
