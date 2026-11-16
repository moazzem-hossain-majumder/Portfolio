import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import RobotCompanion from "@/components/RobotCompanion";
import Link from "next/link";
import { getProfile, getRepos, calculateStats } from "@/utils/data";

export const metadata = {
  title: "Background & Credentials",
  description:
    "Applied Machine Learning & Data Analytics background, verified GitHub activity calendar, education at BRAC University, and Credly certifications for Moazzem Hossain.",
};

export const revalidate = 3600;

export default async function BackgroundPage() {
  const profile = getProfile();
  const username = profile.basics?.githubUsername;
  const repos = await getRepos(username, profile.collaboratorRepos || []);
  const stats = calculateStats(profile, repos);

  return (
    <div className="notebook-page-frame">
      <Navbar basics={profile.basics} />

      <main className="multipage-main-container">
        {/* Page Stamped Header */}
        <section className="page-dossier-header-section">
          <div className="container">
            <div className="dossier-header-badge-row">
              <span className="dossier-index-badge">VERIFIED DOSSIER</span>
              <span className="chip dossier-status-chip">
                {stats.certs} VERIFIED CREDENTIALS
              </span>
            </div>
            <h1 className="dossier-main-title">BACKGROUND &amp; CREDENTIALS</h1>
            <p className="dossier-sub-text">
              Specialized in applied machine learning engineering and data analytics. Verified GitHub contribution activity, academic CS curriculum at BRAC University, and industry certifications.
            </p>
          </div>
        </section>

        {/* 1. About Me, Technical Skills & Verified GitHub Activity Dashboard */}
        <section className="multipage-section" id="about-and-github">
          <div className="container">
            <About
              basics={profile.basics}
              skills={profile.skills}
              stats={stats}
              repos={repos}
            />
          </div>
        </section>

        {/* 2. Professional Experience (if present) */}
        {profile.experiences?.length > 0 && (
          <section className="multipage-section" id="experience-timeline">
            <div className="container">
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
            </div>
          </section>
        )}

        {/* 3. Formal Academic Education */}
        <section className="multipage-section" id="education-timeline">
          <div className="container">
            <Timeline
              title="EDUCATION"
              items={profile.education.map((e) => ({
                heading: e.degree,
                org: e.institution,
                period: e.period,
                desc: e.description,
              }))}
            />
          </div>
        </section>

        {/* 4. Verified Industry Certifications & Badges */}
        <section className="multipage-section" id="certifications-grid">
          <div className="container">
            <Certifications
              certs={profile.certifications}
              credlyUrl={profile.basics.credlyUrl}
            />
          </div>
        </section>

        {/* Cross-Page Navigation Jumper */}
        <section className="page-jumper-section">
          <div className="container">
            <div className="paper jumper-card">
              <div className="jumper-text">
                <h3>READY TO DISCUSS COLLABORATION?</h3>
                <p>Reach out directly for internships, entry-level engineering roles, or explore interactive project capstones.</p>
              </div>
              <div className="jumper-actions">
                <Link href="/contact" className="btn yellow">
                  GET IN TOUCH →
                </Link>
                <Link href="/projects" className="btn secondary">
                  VIEW PROJECTS →
                </Link>
                <Link href="/data-analyst" className="btn secondary">
                  DATA ANALYST TRACK →
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
