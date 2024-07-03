export type GalerieItem = {
	id: string;
	qrDetails: QRDetail[];
};

export type QRDetail = {
	id: string;
	title: string;
	description: string;
	isPublished: boolean;
	imageUrl: string;
	url: string;
	qrImageUrl: string;
};
