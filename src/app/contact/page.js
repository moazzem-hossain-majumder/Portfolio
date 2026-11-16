import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import RobotCompanion from "@/components/RobotCompanion";
import Link from "next/link";
import { getProfile } from "@/utils/data";

export const metadata = {
  title: "Contact & Resume",
  description:
    "Direct contact channels, verified LinkedIn, GitHub profile, and official resume download for Moazzem Hossain.",
};

export const revalidate = 3600;

export default async function ContactPage() {
  const profile = getProfile();

  return (
    <div className="notebook-page-frame">
      <Navbar basics={profile.basics} />

      <main className="multipage-main-container">
        {/* Page Stamped Header */}
        <section className="page-dossier-header-section">
          <div className="container">
            <div className="dossier-header-badge-row">
              <span className="dossier-index-badge">COMMUNICATION</span>
              <span className="chip dossier-status-chip">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
            <h1 className="dossier-main-title">GET IN TOUCH</h1>
            <p className="dossier-sub-text">
              Available for Data Analyst, Machine Learning, and AI Engineering roles. Reach out directly via email, connect on LinkedIn, or download my verified resume.
            </p>
          </div>
        </section>

        {/* 1. Direct Contact Cards & Mail Dispatcher */}
        <section className="multipage-section" id="contact-channels">
          <div className="container">
            <Contact basics={profile.basics} />
          </div>
        </section>

        {/* Cross-Page Navigation Jumper */}
        <section className="page-jumper-section">
          <div className="container">
            <div className="paper jumper-card">
              <div className="jumper-text">
                <h3>EXPLORE THE REST OF THE DOSSIER</h3>
                <p>Review interactive capstones, specialized Data Analyst case studies, or verified GitHub contribution metrics.</p>
              </div>
              <div className="jumper-actions">
                <Link href="/" className="btn secondary">
                  ← OVERVIEW
                </Link>
                <Link href="/projects" className="btn yellow">
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
