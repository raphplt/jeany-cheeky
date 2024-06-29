import { z } from "zod";

const addQrCodeSchema = z.object({
	title: z.string(),
	description: z.string(),
	image: z.any().optional(),
});

export { addQrCodeSchema };
