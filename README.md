# Moazzem Hossain — Portfolio

🔗 **Live:** [portfolio-ecru-ten-foaabz5yq7.vercel.app](https://portfolio-ecru-ten-foaabz5yq7.vercel.app/)

Retro paper-and-stickers portfolio built with **Next.js 14 (App Router)**, plain CSS, and **Framer Motion**.
Hosted on **Vercel**. Dark mode by default, light mode available. Repositories and their stars/language/topics
refresh automatically from the GitHub API — everything else lives in one JSON file you edit yourself, no
code required.

> **Everything you'll personally need to touch lives in `data/profile.json` and the `public/` folder.**
> You never need to open a component file just to update your own info.

---

## 1. Update your photo

1. Drop your new photo into the `public/` folder (any name, e.g. `public/me.jpg`).
2. Open `data/profile.json` → `basics.photo` → set it to the path, e.g. `"/me.jpg"`.
3. That's it — the Hero section and the About section both read from this one field.

If you ever leave `"photo": ""` empty, the site automatically falls back to your GitHub avatar, so it never
breaks.

## 2. Pin (or unpin) a certificate

Open `data/profile.json` → find the certificate inside the `certifications` array → add or flip:

```json
{
  "title": "Retrieval-Augmented Generation with LangChain",
  "issuer": "DataCamp",
  "year": "2026",
  "credentialId": "585,387",
  "link": "",
  "pinned": true
}
```

- `"pinned": true` → shows up in the **📌 pinned by me** row at the top of the Certifications section.
- Leave it out (or set `false`) → the certificate still shows up below, in the searchable/filterable "all
  certificates" grid. Nothing is ever hidden — pinning just decides what's featured first.
- Add a `"link"` (your Credly/IBM/DataCamp verification URL) and a **VERIFY CREDENTIAL** button appears on
  the card automatically.
- Want a **"VERIFY ALL ON CREDLY"** button above the whole section? Set `basics.credlyUrl` (see §5).

## 3. Add / pin projects (not limited to GitHub pins)

Open `data/profile.json` → the `pinnedProjects` array. This feeds the **hand-picked "PROJECTS"** section at
the top. Every one of your *other* public GitHub repos still shows up automatically further down, in
**"ALL REPOSITORIES"** (searchable, filterable by language, sortable) — you don't need to list those, they
come from the GitHub API on their own.

Two kinds of entries, and you can mix as many of either as you want:

**A. One of your own GitHub repos** — pulls live stars/language/topics automatically:

```json
{ "type": "repo", "repo": "DeepSenseV2V", "note": "One sentence shown on the card." }
```

**B. Anything else** — a hackathon project, a private/university repo, a live deployed app, a Kaggle
notebook — no GitHub repo required:

```json
{
  "type": "custom",
  "title": "My Project",
  "note": "What it does, in one sentence.",
  "link": "https://github.com/you/whatever",
  "demo": "https://my-live-demo.com",
  "tags": ["Python", "Machine Learning"],
  "meta": "2026"
}
```

The order of the array is the display order. `note`, `link`, `demo`, `tags`, `meta` are all optional.

## 4. Add education / courses

Open `data/profile.json` → the `education` array (same pattern works for `experiences`):

```json
{
  "degree": "Bachelor of Science, Computer Science",
  "institution": "BRAC University",
  "period": "Jan 2023 - Jan 2027",
  "description": "One or two lines about your focus area."
}
```

Add as many entries as you like — the Education timeline renders every one, and the array order is the
display order.

**When you get your first internship/job**, add it to the `experiences` array (currently `[]`, which is why
that section is blank/hidden right now):

```json
{
  "role": "Data Analyst Intern",
  "company": "Company Name",
  "period": "Jun 2026 - Aug 2026",
  "description": "One or two lines about what you did.",
  "technologies": ["Python", "SQL", "Power BI"]
}
```

The moment `experiences` has at least one entry, an **EXPERIENCE** section appears automatically above
Education — you don't need to touch any component file or uncomment anything. `technologies` is optional
and renders as small tags on the card.

## 5. Update your basic info

All in `data/profile.json` → `basics`:

| Field | What it does |
|---|---|
| `name`, `headline` | Hero title + page `<title>` / meta description |
| `location` | Shown in your intro line if filled in |
| `email` | Every "contact me" / mailto button on the site |
| `githubUsername`, `githubUrl` | Drives the live repo fetch + your GitHub contact card |
| `linkedinUrl` | LinkedIn contact card |
| `photo` | See §1 |
| `resumeUrl` | Leave empty to hide the button everywhere. Set it (e.g. `"/resume.pdf"` after dropping your PDF into `public/`, or a Google Drive link) and a **RESUME** button appears in the navbar and Hero automatically |
| `credlyUrl` | Leave empty to hide the Credly button/card. Set it and a **VERIFY ALL ON CREDLY** button appears above Certifications, plus a Credly card in Contact |
| `siteUrl` | Set this to your live Vercel URL once deployed (e.g. `"https://moazzem.vercel.app"`) — it powers the SEO tags and the link-preview image other people see when you share your portfolio link on LinkedIn/WhatsApp/etc. |

## 6. Update your skills

`data/profile.json` → `skills` array. Each entry is `{ "name": "...", "category": "..." }` — items with the
same `category` are grouped together automatically in the About section (e.g. all `"Language"` skills in one
row). Add a new category name and a new group appears on its own — no extra code needed.

---

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. Once you have your live URL, paste it into `basics.siteUrl` (see §5), commit, and push.
5. Every future push to `main` auto-deploys.

Optional: add a custom domain in Vercel → Settings → Domains.

## Auto-update system

| Event | Result |
|---|---|
| Edit `data/profile.json` and push to `main` | Vercel auto-deploys — site updates in ~1-2 min |
| New public GitHub repo created | Appears in "ALL REPOSITORIES" automatically within ~1 hour (ISR) |
| Repo description / language / stars / topics updated | Refreshes automatically within ~1 hour (ISR) |
| You add/edit a `pinnedProjects` "repo"-type entry | Its live stars/language/topics refresh the same way |

- **All repositories** are fetched live from the GitHub API (`per_page=100`, forks excluded, sorted by last
  updated), then can be searched, filtered by language, and sorted (recent / stars / A-Z) right on the page.
- **Pinned projects, experience, education, certifications, skills** all come from `data/profile.json`
  (single source of truth) — nothing else to touch.
- Empty sections (e.g. `"experiences": []`) are hidden automatically.

---

## What's in this build (recruiter-facing upgrades)

- **Hand-picked "PROJECTS"** section (your best work, in your own order) sitting above a separate, fully
  searchable **"ALL REPOSITORIES"** archive — so a recruiter sees your strongest work first without losing
  anything from your GitHub.
- **Pinned certificates** float to the top of Certifications with a sticker badge; the rest stay searchable
  by title/issuer/skill.
- Your real photo (cropped to a clean headshot) instead of a generic avatar, used consistently in the Hero
  and About sections.
- **GitHub stats + top-languages cards** in the About section (auto-generated from your GitHub activity).
- **Resume button** in the navbar + Hero — hidden until you set `resumeUrl`, so it never links to a 404.
- **Credly verification button** — hidden until you set `credlyUrl`.
- **SEO**: proper page title/description, Open Graph + Twitter card image (so your link looks good when
  shared), and a `Person` structured-data block (`schema.org`) for search engines.
- Custom **favicon** (monogram) instead of the default Next.js icon.
- **Scroll-progress bar** in the navbar and a **back-to-top** button once you scroll past the fold.
- Bumped `next` to the latest patched `14.2.x` release (the version this project started from — `14.2.18`
  — has a known security advisory; this build no longer does).

## Curated for you already (double-check these before your interviews)

- **Pinned projects**: `DeepSenseV2V`, `Telecom-Churn-Prediction`, `CoastNet-Cyclone-Early-Warning-Coastal-Relief-Network`,
  `operations-ai-agent` — picked as your strongest, most complete work. Swap these any time (§3).
- **Pinned certificates**: CS50 (Harvard), Agentic Systems with LangGraph, Retrieval-Augmented Generation
  with LangChain, Python for Data Science AI & Development — your most recognizable / most relevant ones.
  Swap any time (§2).
- **Still placeholders you should fill in** (`data/profile.json` → `basics`): `email` (currently
  `your.email@example.com`), `location`, and — after you deploy — `siteUrl`. `resumeUrl` and `credlyUrl` are
  intentionally left empty; their buttons simply won't appear until you set them.
>>>>>>> 67401d2 (Initial portfolio data setup)

## Structure

```
Portfolio/
<<<<<<< HEAD
├── data/
│   └── profile.json   <- your experience, education, certs, skills
├── public/            <- images, favicon, resume PDF (added later)
└── src/app/           <- Next.js site (added later)
=======
├── data/profile.json              <- your data (edit this — see §1-6 above)
├── public/
│   ├── me.jpg                     <- your photo
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── page.js                <- server page: fetches GitHub repos + profile.json
│   │   ├── layout.js              <- fonts, SEO metadata, JSON-LD, dark-mode init (no flash)
│   │   ├── icon.png / apple-icon.png  <- favicon source (Next.js file-based icons)
│   │   └── globals.css            <- all styling + theme tokens
│   └── components/
│       ├── Navbar.js              <- nav links, resume button, theme toggle, scroll progress
│       ├── Hero.js                <- name, tagline, stats, CTAs
│       ├── Marquee.js             <- scrolling skills ticker
│       ├── About.js               <- bio, skill chips, GitHub stats
│       ├── Timeline.js            <- shared by Experience + Education
│       ├── Certifications.js      <- pinned row + searchable grid
│       ├── FeaturedProjects.js    <- your hand-picked "PROJECTS" section
│       ├── Projects.js            <- "ALL REPOSITORIES" — search/filter/sort
│       ├── Contact.js             <- email / LinkedIn / GitHub / Credly cards
│       └── BackToTop.js
└── next.config.mjs
>>>>>>> 67401d2 (Initial portfolio data setup)
```
