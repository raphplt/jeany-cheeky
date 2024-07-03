"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import QrCodeCard from "@/components/admin/QrCodeCard";
import { Icon } from "@iconify/react";
import Link from "next/link";
import AdminRoutes from "@/components/AdminRoutes";

export default function QrCodeList() {
	const [qrCodes, setQrCodes]: any = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQrCodes = async () => {
			const querySnapshot = await getDocs(collection(db, "pages"));
			const qrCodesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setQrCodes(qrCodesData);
			setLoading(false);
		};

		fetchQrCodes();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Icon icon="akar-icons:loading" className="w-10 h-10 animate-spin" />
				<p className="text-lg text-gray-600">Chargement des QR Codes...</p>
			</div>
		);
	}

	return (
		<AdminRoutes>
			<main className="min-h-screen mt-12">
				<Link
					href="/admin"
					className="w-10/12 text-primary mx-auto font-semibold block my-3"
				>
					Retour
				</Link>
				<div className="flex items-center justify-center flex-col gap-3">
					<h1 className="text-2xl font-bold my-6">Liste des QR Code</h1>
					<div className="flex flex-col gap-3 w-11/12 sm:w-1/3 py-5">
						{qrCodes.map((qrCode: any) => (
							<QrCodeCard key={qrCode.id} qrCode={qrCode} />
						))}
					</div>
				</div>
			</main>
		</AdminRoutes>
	);
}
