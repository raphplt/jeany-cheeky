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

export default function Result({ params }: { params: { slug: string } }) {
	const [result, setResult]: any = useState(null);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const fetchResult = async () => {
			console.log("fetching result");
			const pagesCollectionRef = collection(db, "pages");
			const q = query(pagesCollectionRef, where("url", "==", params.slug));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const docSnap = querySnapshot.docs[0];
				console.log("Document data:", docSnap.data());
				setResult({ id: docSnap.id, ...docSnap.data() });
			} else {
				console.log("No such document!");
			}
		};

		if (user) {
			fetchResult();
		}
	}, [params.slug, user]);

	useEffect(() => {
		const addQrCodeToGallery = async (qrCodeId: any) => {
			if (user) {
				const userDocRef = doc(db, "galerie", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					if (!userData.qrCodes || !userData.qrCodes.includes(qrCodeId)) {
						await updateDoc(userDocRef, {
							qrCodes: arrayUnion(qrCodeId),
						});
						console.log("QR code added to existing document.");
					} else {
						console.log("QR code already scanned.");
					}
				} else {
					await setDoc(userDocRef, {
						qrCodes: [qrCodeId],
					});
					console.log("QR code added to new document.");
				}
			}
		};

		if (result && user) {
			addQrCodeToGallery(result.id);
		}
	}, [result, user]);

	if (!result) {
		return <div>Loading... {params.slug}</div>;
	}

	return (
		<ProtectedRoute>
			<main>
				<Link
					href="/"
					className="text-lg font-semibold hover:underline ml-4 pt-2 block "
				>
					Retour au scan
				</Link>
				<div className="flex items-center justify-center flex-col gap-3 my-8 py-5 bg-slate-100 w-10/12 mx-auto rounded-xl drop-shadow-md">
					<h1 className="text-2xl font-bold "> {result.title}</h1>
					<div className="flex flex-col gap-5 items-center">
						{result.imageUrl && (
							<img
								src={result.imageUrl}
								alt={result.title}
								className="w-[250px] h-fit"
							/>
						)}
						<p className="text-lg">{result.description}</p>
					</div>
					{result.result && (
						<img src={result.qrImageUrl} alt={result.title} className="" />
					)}
				</div>
				<Link
					href="/galerie"
					className="text-lg font-semibold hover:underline mt-10 mx-auto block relative w-fit"
				>
					Accéder à la galerie
				</Link>
			</main>
		</ProtectedRoute>
	);
}
