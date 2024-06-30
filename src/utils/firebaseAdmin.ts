// firebaseAdmin.ts
import * as admin from "firebase-admin";

const serviceAccount = require("../../firebase-admin/jeany-cheeky-firebase-adminsdk-kpekc-91d4b007e2.json");

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

const adminApp = admin.app();

export { adminApp };
