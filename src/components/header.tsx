/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/utils/firebase";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Header() {
	const [user] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdTokenResult().then((idTokenResult) => {
				if (!!idTokenResult.claims.admin) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			});

			// Récupérer le username de l'utilisateur connecté
			const userRef = doc(db, "users", user.uid);
			getDoc(userRef).then((docSnap) => {
				if (docSnap.exists()) {
					setUsername(docSnap.data().username);
				} else {
					console.log("No such document!");
				}
			});
		} else {
			setIsAdmin(false);
			setUsername("");
		}
	}, [user]);

	const handleSignOut = () => {
		auth.signOut();
		setIsAccountMenuOpen(false);
	};

	return (
		<header className="bg-transparent fixed text-white p-3 flex items-center justify-between px-20 top-0 w-full ">
			<Link
				className="text-xl font-bold flex items-center justify-center gap-3 hover:scale-105"
				href="/"
			>
				<img src="/logo.png" alt="Jeany Cheeky" className="w-12 h-12" />
				Jeany Cheeky
			</Link>
			<div className="flex items-center justify-center gap-8 relative">
				{user ? (
					<>
						<Link href="/scan" className="text-lg font-semibold hover:underline">
							Scan
						</Link>
						<Link href="/galerie" className="text-lg font-semibold hover:underline">
							Galerie
						</Link>
						{isAdmin && (
							<Link href="/admin" className="text-lg font-semibold hover:underline">
								Admin
							</Link>
						)}
						<div
							className="relative"
							onMouseEnter={() => setIsAccountMenuOpen(true)}
							onMouseLeave={() => setIsAccountMenuOpen(false)}
						>
							<button className="text-lg font-semibold hover:underline flex gap-2 items-center">
								<Icon icon="codicon:account" className="text-xl" />
								{username || "Mon compte"}
							</button>
							{isAccountMenuOpen && (
								<div className="absolute right-0  w-48 bg-white text-black rounded-lg shadow-lg z-50">
									<Link
										href="/account"
										className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
										onClick={() => setIsAccountMenuOpen(false)}
									>
										Profile
									</Link>
									<button
										onClick={handleSignOut}
										className="block w-full text-left px-4 py-2 hover:bg-red-200 rounded-lg"
									>
										Déconnexion
									</button>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<Link
							href="/auth/login"
							className="text-lg font-semibold hover:underline"
						>
							Connexion
						</Link>
						<Link
							href="/auth/register"
							className="text-lg font-semibold hover:underline"
						>
							Inscription
						</Link>
					</>
				)}
			</div>
		</header>
	);
}
