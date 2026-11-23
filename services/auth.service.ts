import bcrypt from "bcrypt";
import crypto from "crypto";

// login
import { findUserByEmail } from "@/repositories/user.repository";
import { createSession, removeSessionById } from "@/repositories/sessions.repository";

// session
import { cookies } from "next/headers";
import { findSessionByTokenHash } from "@/repositories/sessions.repository";
import { Session } from "@/types/session";


export async function login(email: string, password: string) {

  const user = await findUserByEmail(email);


  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordIsValid) {
    throw new Error("Email ou senha inválidos");
  }

  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await createSession({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const session = await findSessionByTokenHash(tokenHash);

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await removeSessionById(session.id);
    return null;
  }

  return session;
}