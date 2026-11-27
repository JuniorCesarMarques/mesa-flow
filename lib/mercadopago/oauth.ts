
import { createHash, randomBytes } from "node:crypto";

export function generatePKCE() {
  const codeVerifier = randomBytes(32).toString("base64url");

  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  return {
    codeVerifier,
    codeChallenge,
  };
}

export function generateOAuthState() {
  return randomBytes(32).toString("hex");
}
