# Medha Jha — Portfolio

Live at **https://medhajhaportfolio.web.app**

A single-page portfolio in plain HTML, CSS and JavaScript (no build step): live k-means hero animation, scroll-driven experience timeline, filterable project cards, leadership stack, awards timeline, certifications, a Ctrl/⌘K command palette and a small portfolio assistant.

## Editing content
All content lives in the `DATA` object near the top of the `<script>` in `public/index.html`:
experience, projects, skills, leadership, awards, certifications and profile links.
Images live in `public/assets/img/` as WebP (about 1200px wide) and are referenced by file name without the extension.

## Deploying
Every push to `main` deploys to Firebase Hosting through `.github/workflows/firebase-hosting.yml`.
Pull requests get a preview URL.

One-time setup: the workflow needs the repository secret `FIREBASE_SERVICE_ACCOUNT_MEDHAJHAPORTFOLIO`.
The easiest way to create it is to run `firebase init hosting:github` once from this folder and follow the prompts,
or create a service-account key in Google Cloud for the `medhajhaportfolio` project and paste the JSON into
GitHub → Settings → Secrets and variables → Actions.

Manual deploy: `firebase deploy --only hosting`

## Contact form
The form posts to Formspree (`DATA.formEndpoint`). The Cloud Function in `functions/` reads its Gmail app password
from the `GMAIL_APP_PASSWORD` environment variable (`functions/.env`, not committed).
