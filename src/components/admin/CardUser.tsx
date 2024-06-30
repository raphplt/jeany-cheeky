"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Header from "@/components/Header";

export default function CardUser({ user, users, setUsers }: any) {
	const deleteUser = async (userId: string) => {
		await deleteDoc(doc(db, "users", userId));
		setUsers(users.filter((user: any) => user.id !== userId));
	};

	return (
		<li className="flex items-center justify-between border py-3 my-3 border-primary p-2 rounded-xl">
			<p>{user.username}</p>
			<p>{user.email}</p>
			<button onClick={() => deleteUser(user.id)}>Supprimer</button>
		</li>
	);
}
