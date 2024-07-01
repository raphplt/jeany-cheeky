const admin = require("firebase-admin");

// Chemin vers votre fichier de clé JSON de service Firebase
const serviceAccount = require("../firebase-admin/jeany-cheeky-firebase-adminsdk-kpekc-91d4b007e2.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const uid = "";

admin
	.auth()
	.setCustomUserClaims(uid, { admin: true })
	.then(() => {
		console.log(`Utilisateur ${uid} a été promu en tant qu'administrateur.`);
	})
	.catch((error) => {
		console.error("Erreur lors de la promotion de l'utilisateur:", error);
	});
