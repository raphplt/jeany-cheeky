"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AdminRoutes = ({ children }: any) => {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (!loading && !user) {
			redirect("auth/login");
		}
	}, [user, loading]);

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return children;
};

export default AdminRoutes;
