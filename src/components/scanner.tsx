"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function QrReader({
	scannedResult,
	setScannedResult,
}: {
	scannedResult: string | undefined;
	setScannedResult: (result: string | undefined) => void;
}) {
	const scanner = useRef<QrScanner>();
	const videoEl = useRef<HTMLVideoElement>(null);
	const qrBoxEl = useRef<HTMLDivElement>(null);
	const [qrOn, setQrOn] = useState<boolean>(true);

	// Result

	// Success
	const onScanSuccess = (result: QrScanner.ScanResult) => {
		console.log(result);
		setScannedResult(result?.data);
	};

	// Fail
	const onScanFail = (err: string | Error) => {
		console.log(err);
	};

	useEffect(() => {
		if (videoEl?.current && !scanner.current) {
			scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
				onDecodeError: onScanFail,
				preferredCamera: "environment",
				highlightScanRegion: true,
				highlightCodeOutline: true,
				overlay: qrBoxEl?.current || undefined,
			});

			scanner?.current
				?.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false);
				});
		}

		return () => {
			if (!videoEl?.current) {
				scanner?.current?.stop();
			}
		};
	}, []);

	useEffect(() => {
		if (!qrOn)
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
			);
	}, [qrOn]);

	return (
		<>
			<video ref={videoEl} className="object-cover w-80 h-80 rounded-xl"></video>
			<div
				ref={qrBoxEl}
				className="absolute flex items-center justify-center w-80 h-80 "
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				{/* <div className="w-32 h-32 border-2 border-white border-dashed"></div> */}
			</div>

			{scannedResult && (
				<p
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 99999,
						color: "white",
					}}
				>
					Scanned Result: {scannedResult}
				</p>
			)}
		</>
	);
}
