"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Galerie() {
	const [galleryItems, setGalleryItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const fetchGalleryItems = async () => {
			if (!user) return; // Assure que l'utilisateur est connecté

			try {
				const userDocRef = doc(db, "galerie", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();

					const qrDetails = await Promise.all(
						(userData.qrCodes || []).map(async (codeId) => {
							const pageDocRef = doc(db, "pages", codeId);
							const pageDocSnap = await getDoc(pageDocRef);
							if (pageDocSnap.exists()) {
								return { id: codeId, ...pageDocSnap.data() };
							} else {
								console.log(`No such document: ${codeId}`);
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
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1 className="text-xl block py-5 font-bold text-center">Galerie</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{galleryItems.map((item) => (
					<div key={item.id} className="border p-4 rounded shadow w-10/12 mx-auto">
						{item.qrDetails && item.qrDetails.length > 0 ? (
							<ul>
								{item.qrDetails.map((detail) => (
									<li key={detail.id} className="my-2">
										<h3 className="text-lg font-bold">{detail.title}</h3>
										{detail.imageUrl && (
											<img
												src={detail.imageUrl}
												alt={detail.title}
												className="w-[100px] h-auto my-2"
											/>
										)}
										<p>{detail.description}</p>
									</li>
								))}
							</ul>
						) : (
							<p>No QR codes found.</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
