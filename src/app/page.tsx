/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
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
				className="w-full h-screen object-cover absolute z-[-1] top-0"
			/>
			{user ? (
				<div>
					<h1 className="text-4xl font-bold my-5 text-white text-center pt-12">
						Flash le QR Code
					</h1>
					<div className="flex items-center flex-col justify-center py-14">
						<QrReader
							scannedResult={scannedResult}
							setScannedResult={setScannedResult}
						/>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center h-screen">
					<p className="text-xl font-bold text-white text-center w-2/3">
						Connectez-vous pour scanner un QR Code
					</p>
				</div>
			)}
		</main>
	);
}
