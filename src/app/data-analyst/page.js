import fs from "fs";
import path from "path";
import DataAnalystNavbar from "@/components/DataAnalystNavbar";
import DataAnalystHero from "@/components/DataAnalystHero";
import Marquee from "@/components/Marquee";
import DataAnalystProjectSection from "@/components/DataAnalystProjectSection";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import PencilCompanion from "@/components/PencilCompanion";
import RobotCompanion from "@/components/RobotCompanion";
import { DATA_ANALYST_PROJECTS, DATA_ANALYST_CERTIFICATIONS } from "@/../data/dataAnalystProjects";

export const metadata = {
  title: "Data Analyst Portfolio | Moazzem Hossain",
  description:
    "Comprehensive Data Analyst portfolio featuring production case studies across Excel modeling, MySQL/PostgreSQL architecture, Python EDA, and Power BI dashboards.",
};

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

function getProfile() {
  const file = path.join(process.cwd(), "data", "profile.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export default function DataAnalystPage() {
  const profile = getProfile();

  return (
    <div className="notebook-page-frame da-page-frame">
      <DataAnalystNavbar basics={profile.basics} />
      <main>
        <DataAnalystHero basics={profile.basics} />
        <Marquee skills={DA_SKILLS} />

        {/* 4 DIVIDED SECTIONS: EXCEL, SQL, PYTHON, POWER BI */}
        <DataAnalystProjectSection projects={DATA_ANALYST_PROJECTS} />

        {/* ONLY DATA ANALYST CERTIFICATIONS */}
        <Certifications
          certs={DATA_ANALYST_CERTIFICATIONS}
          credlyUrl={profile.basics.credlyUrl}
        />

        {/* ACADEMIC JOURNEY */}
        <Timeline
          
          title="EDUCATION"
          items={profile.education.map((e) => ({
            heading: e.degree,
            org: e.institution,
            period: e.period,
            desc: e.description,
          }))}
        />

        {/* CONTACT */}
        <Contact basics={profile.basics} />
      </main>

      <footer>
        <p>
          Moazzem Hossain • Data Analyst Dossier • {new Date().getFullYear()}
        </p>
      </footer>

      <BackToTop />
      <PencilCompanion />
      <RobotCompanion />
    </div>
  );
}

