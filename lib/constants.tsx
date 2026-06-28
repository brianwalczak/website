export const LOCAL_TIMEZONE = { label: "Central Time (McKinney, TX, USA)", value: "America/Chicago" };
export const POSTS_PER_PAGE = 12;
export const MAX_PRINTER_CHARS = 65;

// -- Icons -- //
import Email from "@/components/icons/Email";
import GitHub from "@/components/icons/GitHub";
import Slack from "@/components/icons/Slack";
import Discord from "@/components/icons/Discord";
import Signal from "@/components/icons/Signal";

export const HEADER_LINKS = [
	{ label: "Home", url: "/" },
	{ label: "Blog", url: "/blog" },
	{ label: "Contact", url: "/contact" },
];

export const FOOTER_LINKS = [
	{
		label: "Email",
		url: "mailto:me@brian.re",
		icon: (<Email className="size-5.5" />),
	},
	{
		label: "GitHub",
		url: "https://github.com/brianwalczak",
		icon: (<GitHub className="size-4.5" />),
	},
	{
		label: "Slack",
		url: "https://hackclub.enterprise.slack.com/team/U091MEESEDT",
		icon: (<Slack className="size-4.5" />),
	},
	{
		label: "Discord",
		url: "https://discord.com/users/603517534720753686",
		icon: (<Discord className="size-5.5" />),
	},
];

export const CONTACT_LINKS = [
	{
		label: "Email",
		value: "me@brian.re",
		url: "mailto:me@brian.re",
		icon: (<Email className="size-8" />),
	},
	{
		label: "Signal",
		value: "@brian.990",
		url: "https://signal.me/#eu/ieHKZt6nU7saogGUCTUyF3DVuHwCx0KtMExbGlONH9xx8BaaSx5LV5DW3crFMh40",
		icon: (<Signal className="size-7" />),
	},
	{
		label: "Slack",
		value: "Hack Club",
		url: "https://hackclub.enterprise.slack.com/team/U091MEESEDT",
		icon: (<Slack className="size-7" />),
	},
	{
		label: "Discord",
		value: "@briannw",
		url: "https://discord.com/users/603517534720753686",
		icon: (<Discord className="size-8.5" />),
	},
];

export const SOCIAL_LINKS = [
	{
		label: "GitHub",
		value: "@brianwalczak",
		url: "https://github.com/brianwalczak",
		icon: (<GitHub className="size-6" />),
	},
];
