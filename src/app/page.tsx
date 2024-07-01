/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth } from "@/utils/firebase";
import QrReader from "@/components/Scanner";
import { useState } from "react";

export default function Index() {
	const [user] = useAuthState(auth);
	const [scannedResult, setScannedResult] = useState<string | undefined>("");

	return (
		<main className="min-h-screen">
			<img
				src="/wallpaper.webp"
				alt="home"
				className="w-full h-screen object-cover absolute z-[-1]"
			/>
			<Header />
			<div className="flex items-center flex-col justify-center py-14">
				<h1 className="text-4xl font-bold my-5 text-white">Flash le QR Code</h1>
				<QrReader
					scannedResult={scannedResult}
					setScannedResult={setScannedResult}
				/>
			</div>
		</main>
	);
}
