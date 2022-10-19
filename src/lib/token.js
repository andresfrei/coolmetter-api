import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const expire = process.env.JWT_EXPIRE;

export async function createToken(data) {
  //const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expire;
  const token = jwt.sign(data, secret, {
    expiresIn: `${expire}d`,
  });
  return token;
}

export function validToken(token) {
  const parts = token.split(".");
  if (parts.length != 3) {
    return null;
  }
  const secret = process.env.JWT_SECRET;
  try {
    const session = jwt.verify(token, secret);
    return session;
  } catch (error) {
    return null;
  }
}
