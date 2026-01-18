import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Posts, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || crypto.randomBytes(64).toString("hex"),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: process.env.BLOB_READ_WRITE_TOKEN !== undefined ? [ // only enable if connected to Vercel project
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ] : [],
});
