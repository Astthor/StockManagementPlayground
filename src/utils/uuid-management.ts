import { parse } from "uuid";

export const convertV4ToMongo = (currentV4: string): string => {
  return currentV4.replace(/-/g, "");
};

export const convertUUIDToBin = (uuid: string): Buffer => {
  return Buffer.from(Array.from(parse(uuid)))
}
