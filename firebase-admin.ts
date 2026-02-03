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
  // Local dev: read from file
  const fs = require("fs");
  const path = require("path");
  serviceAccount = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "service_key.json"), "utf8")
  );
}

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApp();

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
