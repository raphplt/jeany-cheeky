import QrCodeCard from "@/components/admin/QrCodeCard";
import Header from "@/components/Header";

export default function DisplayQrCode({
	params,
}: {
	params: { slug: string };
}) {
	const qrCode = {
		id: params.slug,
		title: "QR Code 1",
		description: "Description du QR Code 1",
		imageUrl: "https://via.placeholder.com/150",
		qrImageUrl: "https://via.placeholder.com/150",
	};

	return (
		<main className="min-h-screen">
			<Header />
			<div className="flex items-center justify-center flex-col gap-3">
				<h1 className="text-2xl font-bold my-5">QR Code : {params.slug}</h1>
				<div className="flex flex-col gap-3">
					<QrCodeCard key={qrCode.id} qrCode={qrCode} />
				</div>
			</div>
		</main>
	);
}
