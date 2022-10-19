import { io } from "../app.js";
import { getShopOnline } from "../lib/sockets.js";
import Shop from "../models/Shop.js";

export const getShop = async (req, res) => {
  const { params } = req;
  const { uid } = params;
  const data = await Shop.find({ uid });
  const shop = data[0];
  if (shop?.uid != uid) return res.status(404).json({ msg: "Shop not found" });
  if (shop.status === 0) return res.status(404).json({ msg: "Shop not found" });
  res.json({ shop });
};

export const emitMessage = (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const socketOnline = getShopOnline(id);
  if (!socketOnline?.socketId) {
    return res.status(404).send("not found");
  }
  io.to(socketOnline.socketId).emit("order", body);
  res.send({ msg: "ok" });
};
