import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jeany Cheeky",
	description: "Enter the world of Jeany Cheeky",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<>
				<body className="mt-16">
					<Header />

					{children}
				</body>
			</>
		</html>
	);
}
