"use client";

import { useState } from "react";
import { defaultLanguages } from "@/lib/codeLanguages";

export default function CodeBlock({ code, language }: { code: string; language?: string | null }) {
	const label = (language && defaultLanguages[language]) || defaultLanguages.plaintext;
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		setCopied(true); // set copied label

		setTimeout(() => setCopied(false), 1500); // reset copied label after a few seconds
	}

	return (
		<div className="code-block">
			<header>
				<span>{label}</span>
				<button onClick={handleCopy} className="copy">
					{copied ? "Copied!" : "Copy"}
				</button>
			</header>
			<pre>
				<code>{code}</code>
			</pre>
		</div>
	);
}
