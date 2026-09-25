import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import FeaturedProjects from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

export const revalidate = 3600; // ISR: re-fetch GitHub data every hour

const GITHUB_USERNAME = "moazzem-hossain-majumder";

async function getRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id,
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated_at: r.updated_at,
        topics: r.topics || [],
        homepage: r.homepage,
      }));
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
  const repos = await getRepos();

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const languages = [
    ...new Set(repos.map((r) => r.language).filter(Boolean)),
  ].sort();
  const stats = {
    projects: (profile.pinnedProjects?.length || 0) + repos.length,
    stars: totalStars,
    certs: profile.certifications?.length || 0,
    languages: languages.length,
  };

  return (
    <>
      <Navbar basics={profile.basics} />
      <main>
        <Hero basics={profile.basics} stats={stats} />
        <Marquee skills={profile.skills} />
        <About basics={profile.basics} skills={profile.skills} />
        {profile.experiences?.length > 0 && (
          <Timeline
            label="where I've worked"
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
          label="my academic journey"
          title="EDUCATION"
          items={profile.education.map((e) => ({
            heading: e.degree,
            org: e.institution,
            period: e.period,
            desc: e.description,
          }))}
        />
        <Certifications certs={profile.certifications} credlyUrl={profile.basics.credlyUrl} />
        <FeaturedProjects pins={profile.pinnedProjects} repos={repos} githubUrl={profile.basics.githubUrl} />
        <Projects repos={repos} languages={languages} />
        <Contact basics={profile.basics} />
      </main>
      <footer>
        <p>
          built with Next.js + GitHub API - auto-updates every hour - {new Date().getFullYear()}
        </p>
      </footer>
      <BackToTop />
    </>
  );
}
