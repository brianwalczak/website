"use client";

import { useState } from "react";

export default function CodeCopyButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		setCopied(true); // set copied label

		setTimeout(() => setCopied(false), 1500); // reset copied label after a few seconds
	}

	return (
		<button onClick={handleCopy} className="copy">
			{copied ? "Copied!" : "Copy"}
		</button>
	);
}
