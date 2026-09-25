import fs from "fs";
import path from "path";
import { Archivo_Black, Caveat, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

function getProfile() {
  try {
    const file = path.join(process.cwd(), "data", "profile.json");
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

const profile = getProfile();
const basics = profile?.basics || {};
const siteUrl = basics.siteUrl || "https://example.com";
const ogImage = basics.photo ? `${siteUrl}${basics.photo}` : undefined;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${basics.name || "Portfolio"} | ${basics.headline?.split("|")[0]?.trim() || "Portfolio"}`,
    template: `%s | ${basics.name || "Portfolio"}`,
  },
  description:
    basics.headline ||
    "Portfolio - projects, certifications, and GitHub activity, auto-updated.",
  keywords: (profile?.skills || []).map((s) => s.name),
  authors: basics.name ? [{ name: basics.name }] : undefined,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: basics.name || "Portfolio",
    description: basics.headline || "",
    url: siteUrl,
    siteName: basics.name || "Portfolio",
    images: ogImage ? [{ url: ogImage, width: 900, height: 900, alt: basics.name }] : undefined,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: basics.name || "Portfolio",
    description: basics.headline || "",
    images: ogImage ? [ogImage] : undefined,
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

const personJsonLd = basics.name
  ? {
      "@context": "https://schema.org",
      "@type": "Person",
      name: basics.name,
      description: basics.headline,
      url: siteUrl,
      image: ogImage,
      email: basics.email,
      sameAs: [basics.githubUrl, basics.linkedinUrl, basics.credlyUrl].filter(Boolean),
    }
  : null;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {personJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        )}
      </head>
      <body className={`${display.variable} ${hand.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}
