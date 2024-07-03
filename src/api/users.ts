// pages/api/admin/users.js
import { adminApp } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.send({ message: "Seules les requêtes GET sont acceptées" });
	}

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
