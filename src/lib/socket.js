export const socketConnection = (socket) => {
  console.log("User connected: ", socket.id);
  socket.on("message", (message) => {
    socket.broadcast.emit("message", "Respuesta -> " & message);
  });
};
