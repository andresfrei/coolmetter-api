export const socketConnection = (socket) => {
  console.log("User connected: ", socket.id);
  socket.on("message", (messaje) => {
    socket.broadcast.emit("messaje", "Respuesta -> " & messaje);
  });
};
