"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GalerieItem } from "../../../types/galerieItems";
import GalerieItemComponent from "@/components/GalerieCard";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function Galerie() {
	const [galleryItems, setGalleryItems] = useState<GalerieItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const fetchGalleryItems = async () => {
			if (!user) return;

			try {
				const userDocRef = doc(db, "galerie", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();

					const qrDetails = await Promise.all(
						(userData.qrCodes || []).map(async (codeId: string) => {
							const pageDocRef = doc(db, "pages", codeId);
							const pageDocSnap = await getDoc(pageDocRef);
							if (pageDocSnap.exists()) {
								return { id: codeId, ...pageDocSnap.data() };
							} else {
								return null;
							}
						})
					);

					setGalleryItems([
						{
							id: user.uid,
							qrDetails: qrDetails.filter((detail) => detail !== null),
						},
					]);
				} else {
					console.log("No gallery document for user.");
					setGalleryItems([]);
				}
			} catch (error) {
				console.error("Error fetching gallery items:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGalleryItems();
	}, [user]);

	if (loading) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				Récupération de la galerie...
			</div>
		);
	}

	return (
		<ProtectedRoute>
			<div>
				<h1 className="text-3xl text-primary block py-5 font-bold text-center">
					Galerie
				</h1>
				<p className="text-center pb-4 text-lg text-secondary font-semibold">
					{galleryItems[0].qrDetails.length} Qr-codes scannés
				</p>
				{galleryItems.map((item) => (
					<div key={item.id} className="w-full sm:w-1/3 mx-auto">
						{item.qrDetails && item.qrDetails.length > 0 ? (
							<GalerieItemComponent key={item.id} item={item} />
						) : (
							<p>No QR codes found.</p>
						)}
					</div>
				))}
			</div>
		</ProtectedRoute>
	);
}
