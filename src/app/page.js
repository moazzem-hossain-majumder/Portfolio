import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StrategicOverviewSection from "@/components/StrategicOverviewSection";
import ConsoleSection from "@/components/ConsoleSection";
import RobotCompanion from "@/components/RobotCompanion";
import Link from "next/link";
import { getProfile, getRepos, calculateStats } from "@/utils/data";

export const revalidate = 3600;

export default async function Home() {
  const profile = getProfile();
  const username = profile.basics?.githubUsername;
  const repos = await getRepos(username, profile.collaboratorRepos || []);
  const stats = calculateStats(profile, repos);

  return (
    <div className="notebook-page-frame">
      <Navbar basics={profile.basics} />

      <main className="multipage-main-container">
        {/* 1. Hero Overview */}
        <section className="multipage-section" id="hero-overview">
          <Hero basics={profile.basics} stats={stats} />
        </section>

        {/* 2. Strategic Engineering Overview */}
        <section className="multipage-section" id="strategic-overview">
          <StrategicOverviewSection currentTrack="main" />
        </section>

        {/* 3. Interactive Console / Terminal */}
        <section className="multipage-section" id="console-terminal">
          <ConsoleSection profile={profile} basics={profile.basics} repos={repos} stats={stats} />
        </section>

        {/* 4. Recruiter Fast-Track Directory (Tactile Binder Cards) */}
        <section className="multipage-section recruiter-directory-section" id="directory">
          <div className="container">
            <div className="directory-header-wrap">
              <span className="directory-badge">RECRUITER DOSSIER DIRECTORY</span>
              <h2 className="directory-heading">EXPLORE THE ARCHIVE</h2>
              <p className="directory-sub">
                Select a focused binder section to inspect production architectures, quantitative case studies, and verified credentials.
              </p>
            </div>

            <div className="directory-grid">
              {/* Directory Card 1: Projects */}
              <Link href="/projects" className="paper directory-card retro-block-card">
                <div className="dir-card-top">
                  <span className="dir-card-tag">CAPSTONES &amp; 3D DECK</span>
                </div>
                <h3 className="dir-card-title">Projects &amp; Case Studies</h3>
                <p className="dir-card-desc">
                  Interactive 3D case study deck, Olist marketplace revenue recovery analysis, and 40+ open-source GitHub repositories.
                </p>
                <div className="dir-card-footer">
                  <span className="dir-card-link">OPEN PROJECTS ↗</span>
                </div>
              </Link>

              {/* Directory Card 2: Data Analyst Track */}
              <Link href="/data-analyst" className="paper directory-card retro-block-card">
                <div className="dir-card-top">
                  <span className="dir-card-tag">SPECIALIZED TRACK</span>
                </div>
                <h3 className="dir-card-title">Data Analyst Track</h3>
                <p className="dir-card-desc">
                  Dedicated portfolio track featuring advanced Excel financial modeling, 3NF MySQL/PostgreSQL schemas, and Power BI dashboards.
                </p>
                <div className="dir-card-footer">
                  <span className="dir-card-link">VIEW DATA TRACK ↗</span>
                </div>
              </Link>

              {/* Directory Card 3: Background & Credentials */}
              <Link href="/background" className="paper directory-card retro-block-card">
                <div className="dir-card-top">
                  <span className="dir-card-tag">VERIFIED ACTIVITY</span>
                </div>
                <h3 className="dir-card-title">Background &amp; Credentials</h3>
                <p className="dir-card-desc">
                  Applied ML bio, verified GitHub contribution calendar heatmap, education at BRAC University, and Credly badges.
                </p>
                <div className="dir-card-footer">
                  <span className="dir-card-link">INSPECT CREDENTIALS ↗</span>
                </div>
              </Link>

              {/* Directory Card 4: Contact */}
              <Link href="/contact" className="paper directory-card retro-block-card">
                <div className="dir-card-top">
                  <span className="dir-card-tag">COMMUNICATION</span>
                </div>
                <h3 className="dir-card-title">Contact &amp; Resume</h3>
                <p className="dir-card-desc">
                  Direct communication channels, resume PDF download, verified LinkedIn, GitHub handle, and availability status.
                </p>
                <div className="dir-card-footer">
                  <span className="dir-card-link">GET IN TOUCH ↗</span>
                </div>
              </Link>
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
