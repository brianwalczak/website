import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					label: "Project Name",
					name: "name",
					type: "text",
					required: true,
					admin: {
						width: "75%",
						placeholder: "Enter your project name...",
					},
				},
				{
					label: "Display Order",
					name: "order",
					type: "number",
					defaultValue: 0,
					admin: {
						width: "25%",
						description: "Lower numbers appear first.",
					},
				},
			],
		},
		{
			label: "Description",
			name: "description",
			type: "textarea",
			required: true,
			admin: {
				placeholder: "Enter a short description of your project...",
			},
		},
		{
			label: "GitHub / Demo URL",
			name: "url",
			type: "text",
			required: true,
			admin: {
				placeholder: "Enter a repository or demo URL...",
			},
		},
		{
			label: "Cover Image",
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			label: "Tags",
			name: "tags",
			type: "array",
			admin: {
				description: "Project stack tags displayed on the project card (e.g., JavaScript, React).",
			},
			fields: [
				{
					name: "tag",
					type: "text",
					required: true,
				},
			],
		},
	],
};
