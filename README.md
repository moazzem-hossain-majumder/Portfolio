# Moazzem Hossain - Portfolio

Personal portfolio website (single source of truth for all profile data).

## How auto-update works

| Event | Result |
|---|---|
| Edit `data/profile.json` and push | Vercel auto-deploys, site updates in ~1-2 min |
| New GitHub repo created | Appears on the site automatically within ~1 hour (ISR) |
| Repo description/language/stars updated | Refreshes automatically within ~1 hour (ISR) |

Projects are fetched live from the GitHub API (`https://api.github.com/users/moazzem-hossain-majumder/repos`), forks excluded. All other data comes from `data/profile.json`.

## How to update your info

1. Open `data/profile.json`
2. Add/edit entries (experience, education, certifications, skills)
3. Commit and push to `main` - the live site updates automatically

Empty sections (e.g. `"experiences": []`) are simply hidden on the site.

## Structure

```
Portfolio/
├── data/
│   └── profile.json   <- your experience, education, certs, skills
├── public/            <- images, favicon, resume PDF (added later)
└── src/app/           <- Next.js site (added later)
```
