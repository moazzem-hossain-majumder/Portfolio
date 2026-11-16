import fs from "fs";
import path from "path";

export const GITHUB_USERNAME = "moazzem-hossain-majumder";

export function getProfile() {
  const file = path.join(process.cwd(), "data", "profile.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export async function getRepos(username = GITHUB_USERNAME, collaboratorRepos = []) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "moazzem-portfolio-app",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let repos = [];

  try {
    if (token) {
      const authRes = await fetch(
        `https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator&sort=updated&per_page=100`,
        { headers, next: { revalidate: 3600 } }
      );
      if (authRes.ok) {
        repos = await authRes.json();
      }
    }

    if (!repos.length) {
      const publicRes = await fetch(
        `https://api.github.com/users/${username}/repos?type=all&per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      );
      if (publicRes.ok) {
        repos = await publicRes.json();
      }
    }

    if (collaboratorRepos && collaboratorRepos.length > 0) {
      const existingFullNames = new Set(
        repos.map((r) => (r.full_name || "").toLowerCase())
      );
      const extraFetches = collaboratorRepos
        .filter((rName) => typeof rName === "string" && !existingFullNames.has(rName.toLowerCase()))
        .map(async (rName) => {
          try {
            const cr = await fetch(`https://api.github.com/repos/${rName}`, {
              headers,
              next: { revalidate: 3600 },
            });
            if (cr.ok) return await cr.json();
          } catch {
            return null;
          }
          return null;
        });

      const extraRepos = (await Promise.all(extraFetches)).filter(Boolean);
      repos = [...repos, ...extraRepos];
    }

    const seenIds = new Set();
    return repos
      .filter((r) => {
        if (!r || !r.id || seenIds.has(r.id)) return false;
        seenIds.add(r.id);
        const isCollab =
          Boolean(r.owner?.login && r.owner.login.toLowerCase() !== username.toLowerCase());
        if (r.fork && !isCollab && !r.stargazers_count) return false;
        return true;
      })
      .map((r) => {
        const isCollab =
          Boolean(r.owner?.login && r.owner.login.toLowerCase() !== username.toLowerCase());
        return {
          id: r.id,
          name: r.name,
          full_name: r.full_name || r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          updated_at: r.updated_at,
          topics: r.topics || [],
          homepage: r.homepage,
          isCollaborator: isCollab,
          isPrivate: Boolean(r.private),
        };
      });
  } catch {
    return [];
  }
}

export function calculateStats(profile, repos = []) {
  const totalStars = repos.reduce((s, r) => s + (r.stars || 0), 0);
  const languages = [
    ...new Set(repos.map((r) => r.language).filter(Boolean)),
  ].sort();

  return {
    projects:
      (profile.pinnedProjects?.length || 0) +
      repos.length +
      (profile.additionalPrivateProjectsCount || 0),
    stars: totalStars + (profile.additionalStarsCount || 0),
    certs: profile.certifications?.length || 0,
    languages: languages.length,
    languagesList: languages,
    collaboratorCount: repos.filter((r) => r.isCollaborator).length,
    privateCount: repos.filter((r) => r.isPrivate).length,
  };
}
