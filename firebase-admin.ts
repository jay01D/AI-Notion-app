import {
  initializeApp,
  getApps,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount: ServiceAccount;

if (process.env.FIREBASE_SERVICE_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
} else {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  serviceAccount = require("@/service_key.json");
}

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApp();

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
