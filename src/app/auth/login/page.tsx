"use client";

import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const LoginPage = () => {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleEmailLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
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

	const handleGoogleLogin = async () => {
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
				<h1 className="text-2xl font-bold mb-5">Connexion</h1>
				<div className="flex flex-col gap-3 w-3/4 sm:w-1/6">
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
						onClick={handleEmailLogin}
						className="p-2 bg-primary text-white hover:bg-secondary rounded-lg"
					>
						Connexion par Email
					</button>
					<button
						onClick={handleGoogleLogin}
						className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
					>
						Connexion avec Google
					</button>
					{error && (
						<p className="text-center text-tomate">
							Erreur d&apos;authentification :{error}
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default LoginPage;
