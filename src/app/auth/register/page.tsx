"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

export default function Register() {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			await setDoc(doc(db, "users", user.uid), {
				username,
				email,
				uid: user.uid,
			});
			redirect("/");
		} catch (err: any) {
			setError(err.message);
		}
	};

	const handleGoogleRegister = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			await setDoc(doc(db, "users", user.uid), {
				username: user.displayName,
				email: user.email,
				uid: user.uid,
			});
			redirect("/");
		} catch (err: any) {
			setError(err.message);
		}
	};

	if (user) {
		redirect("/");
	}

	return (
		<>
			<div className="min-h-[80vh] flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-5">Inscription</h1>
				<div className="flex flex-col gap-3 w-3/4 sm:w-1/6">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Nom d'utilisateur"
						className="p-2 border-2 border-primary rounded-lg"
					/>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="p-2 border-2 border-primary rounded-lg"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Mot de passe"
						className="p-2 border-2 border-primary rounded-lg"
					/>
					<button
						onClick={handleRegister}
						className="p-2 bg-primary text-white hover:bg-secondary rounded-lg"
					>
						Inscription
					</button>
					<button
						onClick={handleGoogleRegister}
						className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
					>
						Connexion avec Google
					</button>
					{error && (
						<p className="text-center text-tomate">Erreur d&apos;authentification</p>
					)}
					<Link href="/login" className="text-primary hover:underline text-center">
						Déjà inscrit ? Connectez-vous
					</Link>
				</div>
			</div>
		</>
	);
}
