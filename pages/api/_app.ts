import dotenv from "dotenv";
import admin, { ServiceAccount } from "firebase-admin";

dotenv.config();

// convert to non base 64 https://dev.to/parondeau/gcp-credentials-next-js-3a0d
const serviceAccountB64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!serviceAccountB64) {
    throw new Error("Service Account Base 64 is missing");
}
const serviceAccount: ServiceAccount = JSON.parse(Buffer.from(serviceAccountB64, 'base64').toString());

// dealing with already initialized firebase apps: https://github.com/vercel/next.js/issues/1999
export const app = !admin.apps.length ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }) : admin.app();

export const firestore = app.firestore();
