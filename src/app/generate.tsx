import QRCode from "react-qr-code";

export default function Generate() {
	return (
		<main className="min-h-screen">
			<div className="flex items-center flex-col justify-center">
				<h1 className="text-4xl font-bold my-5">Jeany Cheeky</h1>
				<QRCode value="https://jeanycheeky.vercel.app" />
			</div>
		</main>
	);
}
