<h1 align="center">Personal Website</h1>

<p align="center">This repository holds the source code for my personal website, <a href="https://brian.re/">brian.re</a>!<br></p>

### Built with...
- React / Next.js v16
- Turso Database (for posts)
- Vercel Blob (for images)
- Tailwind CSS
- Payload CMS

... and written in Typescript (`eslint` for linting)!

> My live status is powered by [cabin-client](https://github.com/brianwalczak/cabin-client), a desktop daemon running on my computer!

### Setup
To start, clone the repository and configure your environment variables:
```bash
git clone https://github.com/brianwalczak/website
cd website
cp .env.example .env
vi .env # make your changes
```

Then, install the necessary dependencies and start the development server.
```bash
npm install
npm run dev
```

> [!WARNING]
> **You may need to migrate your database before you start the server.**
> 
> `npx tsx ./node_modules/payload/bin.js migrate`
