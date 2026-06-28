export const LOCAL_TIMEZONE = { label: "Central Time (McKinney, TX, USA)", value: "America/Chicago" };
export const POSTS_PER_PAGE = 12;
export const MAX_PRINTER_CHARS = 65;

// -- Icons -- //
import Email from "@/components/icons/Email";
import GitHub from "@/components/icons/GitHub";
import Slack from "@/components/icons/Slack";
import Discord from "@/components/icons/Discord";
import Signal from "@/components/icons/Signal";
import ReactIcon from "@/components/icons/React";
import Typescript from "@/components/icons/Typescript";
import Javascript from "@/components/icons/Javascript";
import HTML5 from "@/components/icons/HTML5";
import CSS from "@/components/icons/CSS";
import EJS from "@/components/icons/EJS";
import Tailwind from "@/components/icons/Tailwind";
import NodeJS from "@/components/icons/NodeJS";
import Python from "@/components/icons/Python";
import Java from "@/components/icons/Java";
import Express from "@/components/icons/Express";
import Prisma from "@/components/icons/Prisma";
import Bash from "@/components/icons/Bash";
import Arduino from "@/components/icons/Arduino";
import Docker from "@/components/icons/Docker";
import Blender from "@/components/icons/Blender";
import Fusion360 from "@/components/icons/Fusion360";
import VSCode from "@/components/icons/VSCode";
import AdobePhotoshop from "@/components/icons/AdobePhotoshop";
import AdobeIllustrator from "@/components/icons/AdobeIllustrator";

export const HEADER_LINKS = [
	{ label: "Home", url: "/" },
	{ label: "Projects", url: "/projects" },
	{ label: "Blog", url: "/blog" },
	{ label: "Contact", url: "/contact" },
];

export const FOOTER_LINKS = [
	{
		label: "Email",
		url: "mailto:me@brian.re",
		icon: <Email className="size-5.5" />,
	},
	{
		label: "GitHub",
		url: "https://github.com/brianwalczak",
		icon: <GitHub className="size-4.5" />,
	},
	{
		label: "Slack",
		url: "https://hackclub.enterprise.slack.com/team/U091MEESEDT",
		icon: <Slack className="size-4.5" />,
	},
	{
		label: "Discord",
		url: "https://discord.com/users/603517534720753686",
		icon: <Discord className="size-5.5" />,
	},
];

export const CONTACT_LINKS = [
	{
		label: "Email",
		value: "me@brian.re",
		url: "mailto:me@brian.re",
		icon: <Email className="size-8" />,
	},
	{
		label: "Signal",
		value: "@brian.990",
		url: "https://signal.me/#eu/ieHKZt6nU7saogGUCTUyF3DVuHwCx0KtMExbGlONH9xx8BaaSx5LV5DW3crFMh40",
		icon: <Signal className="size-7" />,
	},
	{
		label: "Slack",
		value: "Hack Club",
		url: "https://hackclub.enterprise.slack.com/team/U091MEESEDT",
		icon: <Slack className="size-7" />,
	},
	{
		label: "Discord",
		value: "@briannw",
		url: "https://discord.com/users/603517534720753686",
		icon: <Discord className="size-8.5" />,
	},
];

export const SOCIAL_LINKS = [
	{
		label: "GitHub",
		value: "@brianwalczak",
		url: "https://github.com/brianwalczak",
		icon: <GitHub className="size-6" />,
	},
];

export const SKILLS_DATA = {
	frontend: [
		{ name: "React / Native", icon: <ReactIcon className="size-10 text-header" /> },
		{ name: "Typescript", icon: <Typescript className="size-10 text-header" /> },
		{ name: "Javascript", icon: <Javascript className="size-10 text-header" /> },
		{ name: "HTML5", icon: <HTML5 className="size-10 text-header" /> },
		{ name: "CSS", icon: <CSS className="size-10 text-header" /> },
		{ name: "EJS", icon: <EJS className="size-10 text-header" /> },
		{ name: "Tailwind CSS", icon: <Tailwind className="size-10 text-header" /> },
	],
	backend: [
		{ name: "Node.js", icon: <NodeJS className="size-10 text-header" /> },
		{ name: "Typescript", icon: <Typescript className="size-10 text-header" /> },
		{ name: "Python", icon: <Python className="size-10 text-header" /> },
		{ name: "Java", icon: <Java className="size-10 text-header" /> },
		{ name: "Express", icon: <Express className="size-10 text-header" /> },
		{ name: "Prisma", icon: <Prisma className="size-9 my-0.5 text-header" /> },
		{ name: "Discord.js", icon: <Discord className="size-10 text-header" /> },
	],
	software: [
		{ name: "Bash", icon: <Bash className="size-10 text-header" /> },
		{ name: "Arduino", icon: <Arduino className="size-10 text-header" /> },
		{ name: "Docker", icon: <Docker className="size-10 text-header" /> },
		{ name: "Blender", icon: <Blender className="size-10 text-header" /> },
		{ name: "Fusion 360", icon: <Fusion360 className="size-9 my-0.5 text-header" /> },
		{ name: "VS Code", icon: <VSCode className="size-8 my-1 text-header" /> },
		{ name: "Adobe Photoshop", icon: <AdobePhotoshop className="text-3xl mt-1" /> },
		{ name: "Adobe Illustrator", icon: <AdobeIllustrator className="text-3xl mt-1" /> },
	],
};
