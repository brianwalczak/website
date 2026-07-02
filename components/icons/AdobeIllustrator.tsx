import { HTMLAttributes } from "react";

export default function AdobeIllustrator({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1 className={`font-extrabold text-header select-none cursor-default${className ? ` ${className}` : ""}`} {...props}>
			Ai
		</h1>
	);
}
