import {
  initializeApp,
  getApps,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "@/service_key.json";

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceKey as ServiceAccount),
      })
    : getApp();

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
