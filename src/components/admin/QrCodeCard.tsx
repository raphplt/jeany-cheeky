/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function QrCodeCard({ qrCode }: any) {
	return (
		<Link
			href={`/admin/display-qr-code/${qrCode.id}`}
			key={qrCode.id}
			className="flex flex-row gap-3 bg-gray-100 py-3 px-6 w-full rounded-xl shadow-md items-center justify-between "
		>
			<div className="flex flex-col gap-2">
				{qrCode.imageUrl && (
					<img src={qrCode.imageUrl} alt={qrCode.title} className="w-1/6 h-fit" />
				)}
				<h2 className="text-xl font-bold">{qrCode.title}</h2>
				<p>{qrCode.description}</p>
			</div>
			{qrCode.qrImageUrl && (
				<img src={qrCode.qrImageUrl} alt={qrCode.title} className="w-1/6" />
			)}
		</Link>
	);
}
