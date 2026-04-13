import jwt from "jwt-simple";

export const encodeData = (data) => {
  return jwt.encode(data, process.env.SECRET_KEY);
};

export const decodeData = (encryptedData) => {
  return jwt.decode(encryptedData, process.env.SECRET_KEY);
};