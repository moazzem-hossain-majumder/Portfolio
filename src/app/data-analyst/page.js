import fs from "fs";
import path from "path";
import DataAnalystNavbar from "@/components/DataAnalystNavbar";
import DataAnalystHero from "@/components/DataAnalystHero";
import StrategicOverviewSection from "@/components/StrategicOverviewSection";
import Marquee from "@/components/Marquee";
import CardDeckShowcase from "@/components/CardDeckShowcase";
import FlagshipSpotlightSection from "@/components/FlagshipSpotlightSection";
import DataAnalystProjectSection from "@/components/DataAnalystProjectSection";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import RobotCompanion from "@/components/RobotCompanion";
import CinematicPresentationDeck from "@/components/CinematicPresentationDeck";
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
  const flagshipProject =
    DATA_ANALYST_PROJECTS.find(
      (p) => p.id === "flagship-olist-marketplace-intelligence"
    ) || DATA_ANALYST_PROJECTS[0];

  const slides = [
    {
      id: "home",
      label: "HERO",
      content: <DataAnalystHero basics={profile.basics} />,
    },
    {
      id: "strategy",
      label: "STRATEGY",
      content: <StrategicOverviewSection currentTrack="data-analyst" />,
    },
    {
      id: "showcase",
      label: "3D DECK",
      content: <CardDeckShowcase projects={DATA_ANALYST_PROJECTS} />,
    },
    {
      id: "flagship",
      label: "FLAGSHIP",
      content: <FlagshipSpotlightSection project={flagshipProject} />,
    },
    {
      id: "catalog",
      label: "CATALOG",
      content: (
        <div className="deck-internal-scroll">
          <Marquee skills={DA_SKILLS} />
          <DataAnalystProjectSection projects={DATA_ANALYST_PROJECTS} />
          <Certifications
            certs={DATA_ANALYST_CERTIFICATIONS}
            credlyUrl={profile.basics.credlyUrl}
          />
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
      ),
    },
    {
      id: "contact",
      label: "CONTACT",
      content: (
        <div className="deck-internal-scroll">
          <Contact basics={profile.basics} />
          <footer>
            <p>
              Moazzem Hossain • Data Analyst Dossier • {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      ),
    },
  ];

  return (
    <div className="notebook-page-frame da-page-frame">
      <DataAnalystNavbar basics={profile.basics} />
      <CinematicPresentationDeck slides={slides} />
      <RobotCompanion />
    </div>
  );
}
