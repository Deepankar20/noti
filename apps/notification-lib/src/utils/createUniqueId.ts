import crypto from "crypto";

export const generateUniqueId = async (prop1: string, prop2:string) => {
  const hash = crypto.createHash("sha256");
  hash.update(prop1+prop2);
  return hash.digest("hex");
};
