import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const expire = process.env.JWT_EXPIRE;

export async function createToken(data) {
  //const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expire;
  console.log(data);
  const token = jwt.sign(data, secret, {
    expiresIn: `${expire}d`,
  });
  return token;
}