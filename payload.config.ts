import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import crypto from "crypto";
import sharp from "sharp";

// https://github.com/payloadcms/payload/issues/14443#issuecomment-3476915013
import { Users } from "./collections/Users";
import { Posts } from "./collections/Posts";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Posts, Media, Projects],
	editor: lexicalEditor(),
	secret: crypto.randomBytes(64).toString("hex"),
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: sqliteAdapter({
		client: {
			url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "",
			authToken: process.env.TURSO_AUTH_TOKEN || undefined,
		},
	}),
	email:
		process.env.EMAIL_ENABLED === "true"
			? nodemailerAdapter({
					defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USERNAME || "",
					defaultFromName: process.env.EMAIL_FROM_NAME || "Payload",
					transportOptions: {
						host: process.env.EMAIL_HOST,
						port: Number(process.env.EMAIL_PORT) || 587,
						auth: {
							user: process.env.EMAIL_USERNAME,
							pass: process.env.EMAIL_PASSWORD,
						},
					},
				})
			: undefined,
	sharp,
	plugins:
		process.env.BLOB_READ_WRITE_TOKEN !== undefined
			? [
					// only enable if connected to Vercel project
					vercelBlobStorage({
						enabled: true,
						collections: { media: true },
						token: process.env.BLOB_READ_WRITE_TOKEN,
					}),
				]
			: [],
});
