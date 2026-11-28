import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const algorithm = "aes-256-gcm";

const key = Buffer.from(
  process.env.ENCRYPTION_KEY!,
  "base64"
);

if (key.length !== 32) {
  throw new Error("Invalid encryption key");
}

export function encrypt(token: string): string {
  const iv = randomBytes(12);

  const cipher = createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decrypt(encryptedToken: string): string {
  const [iv, authTag, encrypted] = encryptedToken
    .split(":")
    .map((part) => Buffer.from(part, "base64"));

  if (!iv || !authTag || !encrypted || iv.length !== 12 || authTag.length !== 16) {
    throw new Error("Invalid encrypted token");
  }

  const decipher = createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}