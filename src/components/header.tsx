export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<h1 className="text-4xl font-bold">Jeany Cheeky</h1>
			<a href="/scan" className="text-lg font-bold">
				Scan
			</a>
			<a href="/generate" className="text-lg font-bold">
				Generate
			</a>
		</header>
	);
}
