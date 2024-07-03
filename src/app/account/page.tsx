"use client";

import ProtectedRoute from "@/components/ProtectedRoutes";
import { auth, db } from "@/utils/firebase";
import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AccountPage() {
	const [user] = useAuthState(auth);
	const [userInfos, setUserInfos] = useState<DocumentData>();
	const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			const userRef = doc(db, "users", user.uid);
			getDoc(userRef).then((docSnap) => {
				if (docSnap.exists() && docSnap.data()) {
					setUserInfos(docSnap.data());
				} else {
					console.error("No such document!");
				}
			});
		}
	}, [user]);

	const signOut = () => {
		auth.signOut();
		redirect("/");
	};

	const deleteAccount = () => {
		if (!user) return;
		const userRef = doc(db, "users", user.uid);
		deleteDoc(userRef)
			.then(() => {
				auth.currentUser
					?.delete()
					.then(() => {
						redirect("/");
					})
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err) => {
				console.error(
					"Erreur lors de la suppression du document utilisateur:",
					err
				);
			});
	};

	return (
		<ProtectedRoute>
			<div className="flex flex-col w-1/2 mx-auto gap-5 py-10">
				<h1 className=" text-2xl font-semibold text-primary">Mon compte</h1>
				<h2 className="text-lg font-semibold text-primary">
					Informations personnelles
				</h2>

				<div className="flex flex-col gap-3">
					<p>
						<strong>Nom d&apos;utilisateur:</strong> {userInfos?.username}
					</p>
					<p>
						<strong>Email:</strong> {userInfos?.email}
					</p>
				</div>
				<div className="flex items-center gap-5">
					<button
						onClick={signOut}
						className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
					>
						Déconnexion
					</button>

					<button
						onClick={() => setConfirmDelete(true)}
						className="bg-tomate text-white py-2 px-4 rounded-lg hover:bg-red-600"
					>
						Supprimer mon compte
					</button>
				</div>
				{confirmDelete && (
					<div className="flex flex-col gap-3 mt-6 w-10/12 mx-auto">
						<p>
							Vous êtes sur le point de supprimer votre compte. Cette action est
							irréversible.
						</p>
						<button
							onClick={deleteAccount}
							className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
						>
							Confirmer la suppression
						</button>
						<button
							onClick={() => setConfirmDelete(false)}
							className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
						>
							Annuler
						</button>
					</div>
				)}
			</div>
		</ProtectedRoute>
	);
}
