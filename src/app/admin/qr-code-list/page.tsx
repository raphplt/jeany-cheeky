"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import QrCodeCard from "@/components/admin/QrCodeCard";
import { Icon } from "@iconify/react";

export default function QrCodelist() {
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
		<main className="min-h-screen">
			<Header />
			<div className="flex items-center justify-center flex-col gap-3">
				<h1 className="text-2xl font-bold my-5">Liste des QR Code</h1>
				<div className="flex flex-col gap-3">
					{qrCodes.map((qrCode: any) => (
						<QrCodeCard key={qrCode.id} qrCode={qrCode} />
					))}
				</div>
			</div>
		</main>
	);
}
