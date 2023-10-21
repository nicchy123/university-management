import Jwt, { Secret } from 'jsonwebtoken';
const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  options: Record<string, unknown>,
): string => {
  return Jwt.sign(payload, secret, options);
};

export const jwtHelpers = { createToken };
