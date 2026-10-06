# Medha Jha — Portfolio

Live at **https://medhajhaportfolio.web.app**

A single-page portfolio in plain HTML, CSS and JavaScript — no build step and no dependencies.
It has a live k-means hero animation, a scroll-driven experience timeline, filterable project
cards, a sticky leadership stack, an awards carousel, certifications, a Ctrl/⌘K command palette
and a small assistant that searches the page's own content.

## Run locally
Everything is static, so any file server works. From the repo root:

```bash
cd public
python -m http.server 8000
```

Then open <http://localhost:8000>.

To match production more closely (hosting rewrites), use the Firebase CLI instead:

```bash
firebase emulators:start --only hosting
```

That serves the site on <http://localhost:5002>; ports are set in `firebase.json`.

## Project structure
```
public/
  index.html               markup, styles, scripts and the DATA object — the whole site
  assets/MedhaJha_Resume.pdf
  assets/img/              WebP images
functions/                 Cloud Functions source (see "Contact form" below)
firebase.json              hosting, functions and emulator config
firestore.rules            Firestore security rules
firestore.indexes.json     Firestore composite indexes
firestore-upload.js        one-off snippet for seeding Firestore; not used by the site
```

## Editing content
All content lives in the `DATA` object near the top of the `<script>` in `public/index.html`:
experience, projects, skills, leadership, awards, certifications and profile links.
Images live in `public/assets/img/` as WebP and are referenced by file name without the
extension — for example `"p-cancer"` resolves to `public/assets/img/p-cancer.webp`.

## Deploying
Every push to `main` deploys to Firebase Hosting through `.github/workflows/firebase-hosting.yml`.
Pull requests opened from this repository get a temporary preview URL posted as a comment;
pull requests from forks are skipped, because they cannot read the deploy secret.

One-time setup: the workflow needs the repository secret `FIREBASE_SERVICE_ACCOUNT_MEDHAJHAPORTFOLIO`.
The easiest way to create it is to run `firebase init hosting:github` once from this folder and follow the prompts,
or create a service-account key in Google Cloud for the `medhajhaportfolio` project and paste the JSON into
GitHub → Settings → Secrets and variables → Actions.

Manual deploy: `firebase deploy --only hosting`

## Contact form
The live form posts to Formspree (`DATA.formEndpoint` in `public/index.html`).

`functions/index.js` also contains a `sendContactEmail` Cloud Function that sends mail through Gmail
with nodemailer. It is **not** wired to the live form — it is an alternative path kept for reference.
If you deploy it, it reads its Gmail app password from the `GMAIL_APP_PASSWORD` environment
variable (`functions/.env`, not committed).

