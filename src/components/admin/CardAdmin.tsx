import Link from "next/link";
import { Icon } from "@iconify/react";

type CardAdminProps = {
	url: string;
	title: string;
	icon: string;
};

export default function CardAdmin({ url, title, icon }: CardAdminProps) {
	return (
		<Link
			href={url}
			className="flex flex-col gap-2 bg-light hover:bg-orange-300 py-8 px-6 w-full rounded-xl shadow-md items-center justify-between"
		>
			<Icon icon={icon} className="text-5xl text-primary" />
			<h2 className="text-xl font-bold text-primary">{title}</h2>
		</Link>
	);
}
