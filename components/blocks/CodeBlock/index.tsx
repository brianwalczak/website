import { defaultLanguages, toShikiLang } from "@/lib/codeLanguages";
import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

export default async function CodeBlock({ code, language }: { code: string; language?: string | null }) {
	const label = (language && defaultLanguages[language]) || defaultLanguages.plaintext;
	const html = await codeToHtml(code, { lang: toShikiLang(language), theme: "github-dark-default" });

	return (
		<div className="code-block">
			<header>
				<span>{label}</span>
				<CopyButton code={code} />
			</header>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}
