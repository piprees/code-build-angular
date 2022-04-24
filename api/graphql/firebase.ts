import { auth, credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

initializeApp({ credential: credential.cert(JSON.parse(process.env['FIREBASE_ADMIN'] as string)) });

export default auth;
