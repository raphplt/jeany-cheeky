"use client";

import { useState } from "react";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

const LoginPage = () => {
	const [user] = useAuthState(auth);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleEmailLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			redirect("/");
		} catch (err: any) {
			setError(err.message);
		}
	};

	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
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
			<Header />
			<div className="min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-5">Login</h1>
				<div className="flex flex-col gap-3">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="p-2 border-2 border-gray-800"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="p-2 border-2 border-gray-800"
					/>
					<button onClick={handleEmailLogin} className="p-2 bg-gray-800 text-white">
						Login with Email
					</button>
					<button onClick={handleGoogleLogin} className="p-2 bg-blue-600 text-white">
						Login with Google
					</button>
					{error && <p className="text-red-500">{error}</p>}
				</div>
			</div>
		</>
	);
};

export default LoginPage;
