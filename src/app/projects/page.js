import Navbar from "@/components/Navbar";
import FlagshipSpotlightSection from "@/components/FlagshipSpotlightSection";
import CardDeckShowcase from "@/components/CardDeckShowcase";
import Marquee from "@/components/Marquee";
import FeaturedProjects from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import RobotCompanion from "@/components/RobotCompanion";
import Link from "next/link";
import { getProfile, getRepos, calculateStats } from "@/utils/data";
import { DATA_ANALYST_PROJECTS } from "@/../data/dataAnalystProjects";

export const metadata = {
  title: "Projects & Capstones",
  description:
    "Interactive 3D case study deck, Olist marketplace revenue recovery analysis, and 40+ open-source GitHub repositories by Moazzem Hossain.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const profile = getProfile();
  const username = profile.basics?.githubUsername;
  const repos = await getRepos(username, profile.collaboratorRepos || []);
  const stats = calculateStats(profile, repos);

  const flagshipProject =
    DATA_ANALYST_PROJECTS.find(
      (p) => p.id === "flagship-olist-marketplace-intelligence"
    ) || DATA_ANALYST_PROJECTS[0];

  return (
    <div className="notebook-page-frame">
      <Navbar basics={profile.basics} />

      <main className="multipage-main-container">
        {/* Page Stamped Header */}
        <section className="page-dossier-header-section">
          <div className="container">
            <div className="dossier-header-badge-row">
              <span className="dossier-index-badge">PROJECT ARCHIVE</span>
              <span className="chip dossier-status-chip">
                {stats.projects}+ PRODUCTION REPOSITORIES
              </span>
            </div>
            <h1 className="dossier-main-title">PROJECTS &amp; CAPSTONES</h1>
            <p className="dossier-sub-text">
              Quantitative data engineering, causal machine learning models, and interactive software systems. Inspect full codebases, live deployments, and empirical findings.
            </p>
          </div>
        </section>

        {/* 1. Flagship Spotlight Case Study */}
        <section className="multipage-section" id="flagship-spotlight">
          <FlagshipSpotlightSection project={flagshipProject} />
        </section>

        {/* 2. Interactive 3D Case Study Deck */}
        <section className="multipage-section" id="case-study-deck">
          <CardDeckShowcase projects={DATA_ANALYST_PROJECTS} />
        </section>

        {/* 3. Tech Stack Ticker */}
        <Marquee skills={profile.skills} />

        {/* 4. Featured Project Pins */}
        <section className="multipage-section" id="featured-pins">
          <div className="container">
            <FeaturedProjects
              pins={profile.pinnedProjects}
              repos={repos}
              githubUrl={profile.basics.githubUrl}
            />
          </div>
        </section>

        {/* 5. Complete Repository Catalog */}
        <section className="multipage-section" id="repositories-catalog">
          <div className="container">
            <Projects repos={repos} languages={stats.languagesList} />
          </div>
        </section>

        {/* Cross-Page Navigation Jumper */}
        <section className="page-jumper-section">
          <div className="container">
            <div className="paper jumper-card">
              <div className="jumper-text">
                <h3>CONTINUE THE DOSSIER AUDIT</h3>
                <p>Inspect specialized Data Analyst case studies or review verified GitHub activity and credentials.</p>
              </div>
              <div className="jumper-actions">
                <Link href="/data-analyst" className="btn yellow">
                  DATA ANALYST TRACK →
                </Link>
                <Link href="/background" className="btn secondary">
                  BACKGROUND &amp; CERTS →
                </Link>
                <Link href="/contact" className="btn secondary">
                  CONTACT →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="multipage-footer">
          <div className="container footer-inner">
            <p>
              {profile.basics?.name || "Moazzem Hossain"} • Built with Next.js &amp; GitHub API • {new Date().getFullYear()}
            </p>
            <div className="footer-links">
              <Link href="/">Overview</Link>
              <span>•</span>
              <Link href="/projects">Projects</Link>
              <span>•</span>
              <Link href="/data-analyst">Data Analyst</Link>
              <span>•</span>
              <Link href="/background">Background</Link>
              <span>•</span>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </main>

      <RobotCompanion />
    </div>
  );
}
