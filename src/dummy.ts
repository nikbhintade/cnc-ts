import { randomBytes } from "crypto";

export function generateRandHexEncodedNamespaceID(): string {
	const nID = randomBytes(8);
	return nID.toString("base64");
}

export function generateRandMessage(): string {
	const lenMsg = Math.floor(Math.random() * 100);
	const msg = randomBytes(lenMsg);
	return msg.toString("base64");
}