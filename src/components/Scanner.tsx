"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import Link from "next/link";

interface QrReaderProps {
	scannedResult: string | undefined;
	setScannedResult: (result: string | undefined) => void;
}

export default function QrReader({
	scannedResult,
	setScannedResult,
}: QrReaderProps) {
	const scanner = useRef<QrScanner>();
	const videoEl = useRef<HTMLVideoElement>(null);
	const qrBoxEl = useRef<HTMLDivElement>(null);
	const [qrOn, setQrOn] = useState<boolean>(true);

	const onScanFail = (err: string | Error) => {
		// console.error(err);
	};

	useEffect(() => {
		if (!videoEl.current) return;

		const onScanSuccess = (result: QrScanner.ScanResult) => {
			setScannedResult(result?.data);
		};
		const currentScanner = new QrScanner(videoEl.current, onScanSuccess, {
			onDecodeError: onScanFail,
			preferredCamera: "environment",
			highlightScanRegion: true,
			highlightCodeOutline: true,
			overlay: qrBoxEl.current || undefined,
		});

		scanner.current = currentScanner;

		currentScanner
			.start()
			.then(() => setQrOn(true))
			.catch((err) => {
				console.error(err);
				setQrOn(false);
			});

		return () => {
			currentScanner.stop();
		};
	}, [setScannedResult]);

	useEffect(() => {
		if (!qrOn) {
			alert(
				"La caméra n'est pas disponible. Veuillez vérifier si elle est bien connectée."
			);
		}
	}, [qrOn]);

	return (
		<>
			<video ref={videoEl} className="object-cover w-80 h-80 rounded-xl"></video>
			<div
				ref={qrBoxEl}
				className="absolute flex items-center justify-center w-80 h-80"
				style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
			></div>
			{scannedResult ? (
				<Link
					href={"/result/" + scannedResult}
					className="rounded-full bg-red-600 h-16 w-16 mt-12 drop-shadow-lg"
				></Link>
			) : (
				<span className="rounded-full bg-red-500 h-16 w-16 mt-12 drop-shadow-lg"></span>
			)}{" "}
		</>
	);
}
