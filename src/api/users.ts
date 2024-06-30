// pages/api/admin/users.js
import { adminApp } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

export default async function handler(req: any, res: any) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.send({ message: "Seules les requêtes GET sont acceptées" });
	}

	// Ici, ajoutez votre logique de vérification pour s'assurer que l'utilisateur est un admin
	// Par exemple, vérifier un token d'authentification ou un rôle spécifique

	try {
		const auth = getAuth(adminApp);
		const listUsersResult = await auth.listUsers();
		const users = listUsersResult.users.map((userRecord) => ({
			uid: userRecord.uid,
			email: userRecord.email,
			displayName: userRecord.displayName,
		}));

		res.status(200).json(users);
	} catch (error: any) {
		res.status(500).send({ error: error.message });
	}
}
