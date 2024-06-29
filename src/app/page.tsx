"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth } from "@/utils/firebase";

export default function Index() {
	const [user] = useAuthState(auth);

	return (
		<main className="min-h-screen">
			<Header />
			<div className="flex items-center flex-col justify-center">
				<h1 className="text-4xl font-bold my-5">Home</h1>
				{user ? (
					<p className="text-2xl font-bold my-5">Welcome {user.email}</p>
				) : (
					<p className="text-2xl font-bold my-5">Welcome Guest</p>
				)}
			</div>
		</main>
	);
}
