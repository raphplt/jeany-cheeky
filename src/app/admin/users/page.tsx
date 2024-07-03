"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import CardUser from "@/components/admin/CardUser";
import Link from "next/link";
import AdminRoutes from "@/components/AdminRoutes";

const AdminPage = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersCollectionRef = collection(db, "users");
			const data: any = await getDocs(usersCollectionRef);
			setUsers(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
		};

		fetchUsers();
	}, []);

	return (
		<AdminRoutes>
			<div>
				<Link
					href="/admin"
					className="w-10/12 text-primary mx-auto font-semibold block my-3"
				>
					Retour
				</Link>
				<h2 className="text-2xl font-semibold text-primary text-center my-5">
					Admin - Gestion des Utilisateurs
				</h2>
				<ul className="w-2/3 mx-auto">
					<li className="flex items-center justify-between border py-3 my-3 border-primary p-2 rounded-xl">
						<p className="font-semibold">Nom d&apos;utilisateur</p>
						<p className="font-semibold">Email</p>
						<p className="font-semibold">Actions</p>
					</li>
					{users.map((user: any) => (
						<CardUser key={user.id} user={user} users={users} setUsers={setUsers} />
					))}
				</ul>
			</div>
		</AdminRoutes>
	);
};

export default AdminPage;
