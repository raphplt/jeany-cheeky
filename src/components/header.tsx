/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/utils/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Icon } from "@iconify/react";

export default function Header() {
	const [user] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

	useEffect(() => {
		if (user) {
			user.getIdTokenResult().then((idTokenResult) => {
				if (!!idTokenResult.claims.admin) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			});
		} else {
			setIsAdmin(false);
		}
	}, [user]);

	const handleSignOut = () => {
		auth.signOut();
		setIsAccountMenuOpen(false);
	};

	return (
		<header className="bg-primary text-white p-3 px-8 flex items-center justify-between">
			<Link
				className="text-xl font-bold flex items-center justify-center gap-3 hover:scale-105"
				href="/"
			>
				<img src="/logo.png" alt="Jeany Cheeky" className="w-12 h-12 " />
				Jeany Cheeky
			</Link>
			<div className="flex items-center justify-center gap-5 relative">
				{user ? (
					<>
						<Link href="/" className="text-lg font-semibold hover:underline">
							Scan
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
								<Icon icon="akar-icons:chevron-down" />
								Mon compte
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
										className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</>
				) : (
					<Link href="/auth/login" className="text-lg font-semibold hover:underline">
						Login
					</Link>
				)}
			</div>
		</header>
	);
}
