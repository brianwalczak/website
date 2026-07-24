import type { JSXConverterArgs, JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import CodeBlock from "./CodeBlock";

type CodeBlockNode = {
	type: "block";
	fields: {
		blockType: "Code";
		code: string;
		language?: string | null;
	};
};

export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
	...defaultConverters,
	blocks: {
		Code: ({ node }: JSXConverterArgs<CodeBlockNode>) => <CodeBlock code={node.fields.code} language={node.fields.language} />,
	},
});
