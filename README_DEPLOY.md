# Deploying to Vercel

Steps to deploy this Next.js app (frontend + backend) to Vercel:

1. Push this repository to GitHub (or Git provider) if not already.

2. Go to https://vercel.com and import the Git repository (Import Project → Select Git Provider → pick the repo).

3. During import, set the Environment Variables (see `.env.production.example`). Required variables include at least:
   - `MONGODB_URI` — MongoDB connection string
   - `NEXTAUTH_SECRET` — random long secret
   - `NEXTAUTH_URL` — production URL (e.g., `https://your-site.vercel.app`)
   - `FIREBASE_*` values if using Firebase
   - Email server credentials for `nodemailer` (`EMAIL_SERVER_*`) if using email

4. Build & Output Settings (defaults are fine for Next.js):
   - Build Command: `npm run build`
   - Output Directory: (leave empty for Next.js)

5. After import, click Deploy. Vercel will provide the deployment URL (e.g., `https://your-site.vercel.app`).

6. To run locally (development):

```bash
npm install
npm run dev
```

7. To test production build locally:

```bash
npm install
npm run build
npm start
```

Notes & Troubleshooting
- If you use MongoDB Atlas, ensure the IP whitelist and credentials are correct.
- Make sure `MONGODB_URI` is set in Vercel's Environment Variables.
- If you use NextAuth, set `NEXTAUTH_URL` and `NEXTAUTH_SECRET`.
- If build fails on Vercel, check the Vercel build logs and ensure environment variables used at build time are set in Project Settings → Environment Variables.

If you want, I can:
- Create a GitHub repo and push these changes for you (requires a GitHub token).
- Attempt a Vercel deployment automatically if you provide Vercel access (API token).
- Run a local `npm run build` here to check for build errors.

