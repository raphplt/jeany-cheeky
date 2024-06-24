"use client";

import QrReader from "@/components/scanner";
import { useState } from "react";

export default function Index() {
	const [scannedResult, setScannedResult] = useState<string | undefined>("");

	return (
		<main className="min-h-screen">
			<div className="flex items-center flex-col justify-center">
				<h1 className="text-4xl font-bold my-5">Jeany Cheeky</h1>
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
	);
}
