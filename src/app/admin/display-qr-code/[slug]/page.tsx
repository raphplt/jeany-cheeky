/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import AdminRoutes from "@/components/AdminRoutes";

export default function DisplayQrCode({
	params,
}: {
	params: { slug: string };
}) {
	const [qrCode, setQrCode]: any = useState(null);

	useEffect(() => {
		const fetchQrCode = async () => {
			const docRef = doc(db, "pages", params.slug);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				setQrCode({ id: docSnap.id, ...docSnap.data() });
			} else {
				console.log("No such document!");
			}
		};

		fetchQrCode();
	}, [params.slug]);

	if (!qrCode) {
		return <div>Loading...</div>;
	}

	return (
		<AdminRoutes>

		<main className="min-h-screen">
			<Link
				href="/admin/qr-code-list"
				className="w-10/12 text-primary mx-auto font-semibold block my-3"
				>
				Back to list
			</Link>

			<div className="flex items-center justify-center flex-col gap-3">
				<h1 className="text-2xl font-bold my-5">QR Code : {qrCode.title}</h1>
				<div className="flex gap-5 items-center">
					{qrCode.imageUrl && (
						<img
						src={qrCode.imageUrl}
						alt={qrCode.title}
						className="w-[250px] h-fit"
						/>
					)}
					<div className="flex flex-col">
						<h2 className="text-xl font-bold">{qrCode.title}</h2>
						<p>{qrCode.description}</p>
					</div>
				</div>
				{qrCode.qrImageUrl && (
					<img src={qrCode.qrImageUrl} alt={qrCode.title} className="" />
				)}
				<p>URL : {qrCode.url}</p>
				{qrCode.isPublished ? (
					<p className="text-green-500">Published</p>
				) : (
					<p className="text-red-500">Not published</p>
				)}
			</div>
		</main>
				</AdminRoutes>
	);
}
