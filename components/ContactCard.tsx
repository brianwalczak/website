import { ReactNode } from "react";

import UpRightFromSquare from "@/components/icons/UpRightFromSquare";

type Props = {
	label: string;
	value?: string;
	url: string;
	icon?: ReactNode;
};

export default function ContactCard({ label, value, url, icon }: Props) {
	return (
		<a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center border border-surface-border bg-surface hover:bg-surface-hover hover:border-surface-border-hover rounded-xl p-6 gap-4 transition group">
			{icon && <div className="text-purple-400">{icon}</div>}

			<div className="flex-1">
				<div className="font-semibold text-header truncate">{label}</div>
				<div className="text-sm truncate">{value ? value : url.replace("https://", "").replace("www.", "")}</div>
			</div>

			<UpRightFromSquare className="size-3.5 text-text-hover group-hover:text-text transition" />
		</a>
	);
}
