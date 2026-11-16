import Navbar from "@/components/Navbar";
import DataAnalystHero from "@/components/DataAnalystHero";
import StrategicOverviewSection from "@/components/StrategicOverviewSection";
import Marquee from "@/components/Marquee";
import DataAnalystProjectSection from "@/components/DataAnalystProjectSection";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import RobotCompanion from "@/components/RobotCompanion";
import Link from "next/link";
import { getProfile } from "@/utils/data";
import { DATA_ANALYST_PROJECTS, DATA_ANALYST_CERTIFICATIONS } from "@/../data/dataAnalystProjects";

export const metadata = {
  title: "Data Analyst Portfolio | Moazzem Hossain",
  description:
    "Comprehensive Data Analyst portfolio featuring production case studies across Excel modeling, MySQL/PostgreSQL architecture, Python EDA, and Power BI dashboards.",
};

export const revalidate = 3600;

const DA_SKILLS = [
  { name: "Excel Advanced Modeling", category: "Data" },
  { name: "MySQL 8.0 & PostgreSQL", category: "Language" },
  { name: "Power BI & DAX", category: "Data" },
  { name: "Python for Data Analysis", category: "Language" },
  { name: "Pandas & NumPy", category: "Data" },
  { name: "Window Functions & CTEs", category: "Data" },
  { name: "Cohort & Churn Modeling", category: "Data" },
  { name: "Exploratory Data Analysis (EDA)", category: "Data" },
  { name: "Data Cleaning & Hygiene", category: "Data" },
  { name: "Relational Database Design (3NF)", category: "Data" },
  { name: "Statistics & Probability", category: "Data" },
  { name: "Executive Dashboards", category: "Data" },
  { name: "Git & GitHub", category: "Tool" },
];

export default function DataAnalystPage() {
  const profile = getProfile();

  return (
    <div className="notebook-page-frame da-page-frame">
      <Navbar basics={profile.basics} />

      <main className="multipage-main-container">
        {/* Page Stamped Header */}
        <section className="page-dossier-header-section">
          <div className="container">
            <div className="dossier-header-badge-row">
              <span className="dossier-index-badge">DATA ANALYST SPECIALIZATION</span>
              <span className="chip dossier-status-chip">
                PRODUCTION DOSSIER
              </span>
            </div>
            <h1 className="dossier-main-title">DATA ANALYST PORTFOLIO</h1>
            <p className="dossier-sub-text">
              Transforming complex relational datasets into clear commercial decisions. Specialized in financial modeling, SQL schema normalization, reproducible Python EDA, and executive Power BI dashboards.
            </p>
          </div>
        </section>

        {/* 1. Data Analyst Hero Banner */}
        <section className="multipage-section" id="da-hero">
          <DataAnalystHero basics={profile.basics} />
        </section>

        {/* 2. Strategic Methodology Overview */}
        <section className="multipage-section" id="da-strategy">
          <StrategicOverviewSection currentTrack="data-analyst" />
        </section>

        {/* 3. Specialized Skills Ticker */}
        <Marquee skills={DA_SKILLS} />

        {/* 4. Complete Case Studies Catalog */}
        <section className="multipage-section" id="da-case-studies">
          <div className="container">
            <DataAnalystProjectSection projects={DATA_ANALYST_PROJECTS} />
          </div>
        </section>

        {/* 5. Verified Data Analyst Certifications */}
        <section className="multipage-section" id="da-certifications">
          <div className="container">
            <Certifications
              certs={DATA_ANALYST_CERTIFICATIONS}
              credlyUrl={profile.basics.credlyUrl}
            />
          </div>
        </section>

        {/* 6. Education Timeline */}
        <section className="multipage-section" id="da-education">
          <div className="container">
            <Timeline
              title="ACADEMIC BACKGROUND"
              items={profile.education.map((e) => ({
                heading: e.degree,
                org: e.institution,
                period: e.period,
                desc: e.description,
              }))}
            />
          </div>
        </section>

        {/* Cross-Page Navigation Jumper */}
        <section className="page-jumper-section">
          <div className="container">
            <div className="paper jumper-card">
              <div className="jumper-text">
                <h3>NEED CUSTOM ANALYTICS OR DATA PIPELINES?</h3>
                <p>Available for immediate freelance consultations, data audits, and full-time analyst roles.</p>
              </div>
              <div className="jumper-actions">
                <Link href="/contact" className="btn yellow">
                  CONTACT ME →
                </Link>
                <Link href="/projects" className="btn secondary">
                  VIEW ALL PROJECTS →
                </Link>
                <Link href="/background" className="btn secondary">
                  GITHUB ACTIVITY &amp; BIO →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="multipage-footer">
          <div className="container footer-inner">
            <p>
              {profile.basics?.name || "Moazzem Hossain"} • Data Analyst Track • {new Date().getFullYear()}
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
