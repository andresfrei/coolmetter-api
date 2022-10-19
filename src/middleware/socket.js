import { validToken } from "../lib/token.js";

export const socketMiddleware = (socket, next) => {
  let session = null;
  const token = socket.handshake.auth.token;
  if (token) {
    session = validToken(token);
  }
  if (!token || !session?.shopID) {
    console.log("Auth false");
    socket.on("disconnect", (reason) => {
      {
        auth: false;
      }
    });
  } else {
    socket.request.session = session;
    next();
  }
};
