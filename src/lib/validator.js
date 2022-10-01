import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const handleHttpError = (res, e, status = 403) => {
  console.log(e);
  return res.send({ error: e }).status(status);
};
