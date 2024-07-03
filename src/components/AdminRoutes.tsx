"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const AdminRoutes = ({ children }: any) => {
	const [user, loading] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				router.push("/auth/login");
			} else {
				user.getIdTokenResult().then((idTokenResult) => {
					if (!idTokenResult.claims.admin) {
						console.log("User is not an admin");
						router.push("/auth/login");
					} else {
						setIsAdmin(true);
					}
				});
			}
		}
	}, [user, loading, router]);

	if (loading || !isAdmin) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Icon icon="akar-icons:loading" className="w-10 h-10 animate-spin" />
				<p className="text-lg text-gray-600">Chargement des QR Codes...</p>
			</div>
		);
	}

	return children;
};

export default AdminRoutes;
