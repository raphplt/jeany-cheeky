"use client";

import ProtectedRoute from "@/components/ProtectedRoutes";
import QrReader from "@/components/Scanner";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

export default function Scan() {
	const [scannedResult, setScannedResult] = useState<string | undefined>("");

	useEffect(() => {
		if (scannedResult) {
			redirect(scannedResult);
		}
	}, [scannedResult]);

	return (
		<ProtectedRoute>
			<main className="min-h-screen">
				<div className="flex items-center flex-col justify-center">
					<h1 className="text-4xl font-bold my-5">Scan QR Code</h1>
					<QrReader
						scannedResult={scannedResult}
						setScannedResult={setScannedResult}
					/>
				</div>

				{scannedResult && (
					<div className="flex items-center flex-col justify-center">
						<h1 className="text-4xl font-bold my-5">Result</h1>
						<p className="text-2xl font-bold my-5">{scannedResult}</p>
					</div>
				)}
			</main>
		</ProtectedRoute>
	);
}
