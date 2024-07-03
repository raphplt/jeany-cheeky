/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
	getDocs,
	query,
	where,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { QRDetail } from "../../../../types/galerieItems";
import { DocumentData } from "firebase-admin/firestore";
import { useSwipeable } from "react-swipeable";
import { Icon } from "@iconify/react";

export default function Result({ params }: { params: { slug: string } }) {
	const [result, setResult] = useState<QRDetail | DocumentData | undefined>();
	const [user] = useAuthState(auth);
	const [error, setError] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const images = result
		? [result.imageUrl, result.qrImageUrl].filter(Boolean)
		: [];

	useEffect(() => {
		const fetchResult = async () => {
			const pagesCollectionRef = collection(db, "pages");
			const q = query(pagesCollectionRef, where("url", "==", params.slug));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const docSnap = querySnapshot.docs[0];
				setResult({ id: docSnap.id, ...docSnap.data() });
			} else {
				setError("No such document!");
			}
		};

		if (user) {
			fetchResult();
		}
	}, [params.slug, user]);

	useEffect(() => {
		const addQrCodeToGallery = async (qrCodeId: any) => {
			if (user && result) {
				const userDocRef = doc(db, "galerie", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					if (!userData.qrCodes || !userData.qrCodes.includes(qrCodeId)) {
						await updateDoc(userDocRef, {
							qrCodes: arrayUnion(qrCodeId),
						});
					} else {
						setError("QR code already scanned.");
					}
				} else {
					await setDoc(userDocRef, {
						qrCodes: [qrCodeId],
					});
				}
			}
		};

		if (result && user) {
			addQrCodeToGallery(result.id);
		}
	}, [result, user]);

	const handlers = useSwipeable({
		onSwipedLeft: () =>
			setActiveIndex((prevIndex) => (prevIndex + 1) % images.length),
		onSwipedRight: () =>
			setActiveIndex(
				(prevIndex) => (prevIndex - 1 + images.length) % images.length
			),
	});

	if (!result) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				Récupération des données...
			</div>
		);
	}

	return (
		<ProtectedRoute>
			<main>
				<Link
					href="/"
					className="font-semibold hover:underline ml-4 pt-2 flex items-center gap-2"
				>
					<Icon icon="akar-icons:arrow-left" className="w-5 h-5 inline" />
					<p>Retour au scan</p>
				</Link>
				<div className="flex items-center justify-center flex-col gap-3 my-8 py-5 bg-slate-100 w-10/12 mx-auto rounded-xl drop-shadow-md">
					<h1 className="text-2xl font-bold "> {result.title}</h1>
					<div {...handlers} className="flex flex-col gap-5 items-center">
						{images.length > 0 && (
							<img
								src={images[activeIndex]}
								alt={result.title}
								className="w-[250px] h-fit"
							/>
						)}
						<p className="text-lg">{result.description}</p>
					</div>
					<div className="flex gap-2">
						{images.map((_, index) => (
							<button
								key={index}
								className={`h-3 w-3 rounded-full ${
									activeIndex === index ? "bg-primary" : "bg-gray-400"
								}`}
								onClick={() => setActiveIndex(index)}
							/>
						))}
					</div>
				</div>
				<Link
					href="/galerie"
					className="text-lg font-semibold hover:underline mt-10 mx-auto block relative w-fit px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg shadow-lg"
				>
					Accéder à la galerie
				</Link>
			</main>
		</ProtectedRoute>
	);
}
