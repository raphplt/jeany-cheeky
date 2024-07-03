/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GalerieItem } from "../../types/galerieItems";

interface GalerieItemComponentProps {
	item: GalerieItem;
}

export default function GalerieItemComponent({
	item,
}: GalerieItemComponentProps) {
	return (
		<div key={item.id} className="px-4 ">
			{item.qrDetails && item.qrDetails.length > 0 ? (
				<ul>
					{item.qrDetails.map((detail) => (
						<li
							key={detail.id}
							className="my-3 border bg-gray-100 p-2 rounded-lg flex justify-between items-center drop-shadow-md"
						>
							<div className="flex flex-col justify-between">
								<h3 className="text-lg font-bold">{detail.title}</h3>
								<p>{detail.description}</p>
							</div>
							{detail.imageUrl && (
								<img
									src={detail.imageUrl}
									alt={detail.title}
									className="h-[100px] w-fit my-2"
								/>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>No QR codes found.</p>
			)}
		</div>
	);
}
