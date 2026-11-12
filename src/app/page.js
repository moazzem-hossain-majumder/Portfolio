import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StrategicOverviewSection from "@/components/StrategicOverviewSection";
import ConsoleSection from "@/components/ConsoleSection";
import Marquee from "@/components/Marquee";
import CardDeckShowcase from "@/components/CardDeckShowcase";
import FlagshipSpotlightSection from "@/components/FlagshipSpotlightSection";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import FeaturedProjects from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import RobotCompanion from "@/components/RobotCompanion";
import { DATA_ANALYST_PROJECTS } from "@/../data/dataAnalystProjects";

export const revalidate = 3600; // ISR: re-fetch GitHub data every hour

const GITHUB_USERNAME = "moazzem-hossain-majumder";

async function getRepos(username = GITHUB_USERNAME, collaboratorRepos = []) {
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

function getProfile() {
  const file = path.join(process.cwd(), "data", "profile.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export default async function Home() {
  const profile = getProfile();
  const username = profile.basics?.githubUsername || GITHUB_USERNAME;
  const repos = await getRepos(username, profile.collaboratorRepos || []);

  const totalStars = repos.reduce((s, r) => s + (r.stars || 0), 0);
  const languages = [
    ...new Set(repos.map((r) => r.language).filter(Boolean)),
  ].sort();
  const stats = {
    projects:
      (profile.pinnedProjects?.length || 0) +
      repos.length +
      (profile.additionalPrivateProjectsCount || 0),
    stars: totalStars + (profile.additionalStarsCount || 0),
    certs: profile.certifications?.length || 0,
    languages: languages.length,
    collaboratorCount: repos.filter((r) => r.isCollaborator).length,
    privateCount: repos.filter((r) => r.isPrivate).length,
  };

  const flagshipProject =
    DATA_ANALYST_PROJECTS.find(
      (p) => p.id === "flagship-olist-marketplace-intelligence"
    ) || DATA_ANALYST_PROJECTS[0];

  return (
    <div className="notebook-page-frame cinematic-page-container">
      <Navbar basics={profile.basics} />

      <main>
        {/* STAGE 1: HERO */}
        <Hero basics={profile.basics} stats={stats} />

        {/* STAGE 2: STRATEGY & ARCHITECTURE */}
        <StrategicOverviewSection currentTrack="main" />

        {/* STAGE 3: CONSOLE & SUMMARY BOX */}
        <ConsoleSection profile={profile} basics={profile.basics} repos={repos} stats={stats} />

        <Marquee skills={profile.skills} />

        {/* STAGE 4: INTERACTIVE 3D CARD DECK */}
        <CardDeckShowcase projects={DATA_ANALYST_PROJECTS} />

        {/* STAGE 5: FLAGSHIP CAPSTONE SPOTLIGHT */}
        <FlagshipSpotlightSection project={flagshipProject} />

        {/* STAGE 6: ABOUT & BACKGROUND */}
        <About basics={profile.basics} skills={profile.skills} />

        {profile.experiences?.length > 0 && (
          <Timeline
            title="EXPERIENCE"
            items={profile.experiences.map((e) => ({
              heading: e.role,
              org: e.company,
              period: e.period,
              desc: e.description,
              tags: e.technologies,
            }))}
          />
        )}

        <Timeline
          title="EDUCATION"
          items={profile.education.map((e) => ({
            heading: e.degree,
            org: e.institution,
            period: e.period,
            desc: e.description,
          }))}
        />

        <Certifications certs={profile.certifications} credlyUrl={profile.basics.credlyUrl} />

        {/* STAGE 7: FEATURED & ALL REPOS */}
        <FeaturedProjects pins={profile.pinnedProjects} repos={repos} githubUrl={profile.basics.githubUrl} />
        <Projects repos={repos} languages={languages} />

        {/* STAGE 8: CONTACT */}
        <Contact basics={profile.basics} />
      </main>

      <footer>
        <p>
          Moazzem Hossain • Built with Next.js &amp; GitHub API • {new Date().getFullYear()}
        </p>
      </footer>

      <BackToTop />
      <RobotCompanion />
    </div>
  );
}
