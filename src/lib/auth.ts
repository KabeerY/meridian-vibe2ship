import type { FirebaseOptions } from "firebase/app";
import type { Auth, User } from "firebase/auth";

let authPromise: Promise<Auth> | null = null;

function friendlyAuthError(reason: unknown) {
  const code = typeof reason === "object" && reason && "code" in reason
    ? String((reason as { code?: unknown }).code)
    : "";
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "That email already has a Meridian account. Sign in instead.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/network-request-failed": "The account service could not connect. Check the connection and try again.",
    "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
    "auth/weak-password": "Use a password with at least six characters.",
  };
  return new Error(messages[code] ?? "Account access is temporarily unavailable. The guided demo still works without signing in.");
}

async function loadAuth() {
  if (!authPromise) {
    authPromise = Promise.all([
      import("firebase/app"),
      import("firebase/auth"),
      fetch("/api/config").then(async (response) => {
        if (!response.ok) throw new Error("Account service is unavailable.");
        return response.json() as Promise<{ firebase?: FirebaseOptions }>;
      }),
    ]).then(([{ initializeApp }, { getAuth }, { firebase }]) => {
        if (!firebase?.apiKey || !firebase.authDomain || !firebase.projectId) {
          throw new Error("Account creation is not configured yet. The guided demo remains available.");
        }
        return getAuth(initializeApp(firebase));
      });
  }
  return authPromise;
}

function toAccount(user: User) {
  return {
    uid: user.uid,
    email: user.email ?? "Meridian account",
    name: user.displayName ?? user.email?.split("@")[0] ?? "Member",
  };
}

export async function createAccount(email: string, password: string) {
  try {
    const [auth, { createUserWithEmailAndPassword }] = await Promise.all([loadAuth(), import("firebase/auth")]);
    return toAccount((await createUserWithEmailAndPassword(auth, email, password)).user);
  } catch (reason) {
    throw friendlyAuthError(reason);
  }
}

export async function signInAccount(email: string, password: string) {
  try {
    const [auth, { signInWithEmailAndPassword }] = await Promise.all([loadAuth(), import("firebase/auth")]);
    return toAccount((await signInWithEmailAndPassword(auth, email, password)).user);
  } catch (reason) {
    throw friendlyAuthError(reason);
  }
}

export async function signOutAccount() {
  const [auth, { signOut }] = await Promise.all([loadAuth(), import("firebase/auth")]);
  await signOut(auth);
}
