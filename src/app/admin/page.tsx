"use client";

import AdminRoutes from "@/components/AdminRoutes";
import CardAdmin from "@/components/admin/CardAdmin";

export default function AdminPage() {
	return (
		<AdminRoutes>
			<div>
				<h1 className="text-2xl text-primary font-semibold py-12 text-center">
					Administration
				</h1>
				<div className="flex gap-3 items-start justify-start w-10/12 mx-auto sm:flex-row flex-col">
					<CardAdmin url="/admin/users" title="Utilisateurs" icon="mdi:users" />
					<CardAdmin
						url="/admin/generate"
						title="Générer un QR Code"
						icon="ic:baseline-qrcode"
					/>
					<CardAdmin
						url="/admin/qr-code-list"
						title="Liste des QR codes"
						icon="material-symbols:folder"
					/>
				</div>
			</div>
		</AdminRoutes>
	);
}
