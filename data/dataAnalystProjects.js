// Authentic Data Analyst Portfolio Data
// All projects, metrics, schemas, and findings strictly sourced from Moazzem Hossain's GitHub repositories

export const DATA_ANALYST_PROJECTS = [
  // =========================================================================
  // 1. EXCEL ANALYTICS
  // =========================================================================
  {
    id: "excel-mobile-app-market",
    category: "Excel",
    categoryLabel: "Excel Modeling & EDA",
    categoryBadgeColor: "var(--green)",
    title: "Mobile App Market Analysis: iOS App Store vs. Google Play Store",
    subtitle: "End-to-End Exploratory Data Analysis & Analytical Excel Modeling Benchmarking 16,856 Real Mobile Apps",
    repoUrl: "https://github.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis",
    repoName: "Mobile-App-Market-Analysis",
    highlightBadge: "16,856 Apps • 10-Sheet Dynamic Model",
    featured: true,
    overview:
      "An end-to-end exploratory data analysis in Excel and Python benchmarking 16,856 real mobile applications across the Apple App Store and Google Play Store. Combines robust data cleaning, dynamic formula-driven analytical modeling, an interactive dashboard, and actionable strategic findings for mobile product managers, developers, and marketers.",
    problemStatement:
      "Launching and scaling a mobile app is fraught with strategic pitfalls. Thousands of new apps are published monthly, yet over 90% fail to achieve meaningful traction, user retention, or monetization. Product and engineering teams frequently stumble because they treat iOS and Android as identical ecosystems or rely on gut instinct rather than empirical market data.",
    businessQuestions: [
      "How do iOS and Android differ in monetization structure, user ratings, and audience engagement?",
      "Which app categories exhibit the widest cross-platform customer satisfaction gaps?",
      "How strongly do update frequency, multi-language localization, and app size correlate with popularity?",
      "What is the optimal minimum Android SDK support target to maximize addressable audience while minimizing maintenance debt?",
    ],
    dataset: {
      name: "Curated Apple App Store & Google Play Store Snapshots",
      scale: "16,856 cleaned records (7,197 iOS apps, 9,659 Android apps)",
      sources: "Google Play Store (Lavanya Gupta via Kaggle) & Apple App Store (Ramanathan Ramakrishnan via Kaggle)",
      cleaningNotes: "Removed shifted columns, eliminated 483 exact duplicates, resolved 698 multi-listings, parsed file sizes in 'k' to MB, stripped currency symbols, and handled unrated apps.",
    },
    kpis: [
      { label: "Cleaned Apps Analyzed", value: "16,856", note: "7,197 iOS + 9,659 Android", color: "var(--blue)" },
      { label: "iOS Paid Apps Share", value: "43.6%", note: "5.6x higher than Android (7.8%)", color: "var(--yellow)" },
      { label: "Android Free Apps Share", value: "92.2%", note: "Heavily freemium/ad-driven market", color: "var(--green)" },
      { label: "Avg User Rating", value: "4.05 vs 4.17", note: "Android outscores iOS in 16/16 categories", color: "var(--pink)" },
      { label: "Median Engagement", value: "300 vs 969", note: "Android shows >3x higher median reviews", color: "var(--purple)" },
      { label: "App Bundle Size", value: "189.9 vs 20.4 MB", note: "iOS apps average 9.3x larger in file size", color: "var(--orange)" },
    ],
    findings: [
      {
        title: "Paid downloads are viable on iOS, but virtually obsolete on Android",
        desc: "43.6% of App Store apps carry an upfront price tag compared to just 7.8% on Google Play. Developers launching upfront paid downloads on Android face severe audience rejection.",
        metric: "43.6% vs 7.8%",
      },
      {
        title: "Distinct rating distributions & cross-platform satisfaction gaps",
        desc: "iOS displays a polarized, bimodal rating distribution (50.3% sit in the 4.5+ bracket, but 6.4% drop under 3.0 stars). Google Play outscores iOS across all 16 comparable categories, with peak deficits in Sports (-0.85 stars), Finance (-0.55 stars), and Social (-0.53 stars).",
        metric: "-0.85 Star Gap in Sports",
      },
      {
        title: "Update cadence directly predicts audience size and sentiment",
        desc: "Google Play apps updated within the last 30 days are nearly twice as likely to reach 1,000+ reviews (70.5%) compared to apps untouched for over two years (36.1%), while sustaining higher average ratings (4.27 vs 4.05).",
        metric: "70.5% vs 36.1% 1K+ Reviews",
      },
      {
        title: "Multi-language localization unlocks upper-tier growth",
        desc: "On iOS, apps supporting 10 or more languages have nearly double the rate of reaching 1,000+ ratings (58.3%) compared to single-language apps (29.7%), accompanied by higher customer ratings (4.19 vs 3.96).",
        metric: "58.3% vs 29.7% Reaching 1K+ Ratings",
      },
      {
        title: "Android Version 4.0 covers the overwhelming majority of users",
        desc: "72.8% of Google Play apps specify Android 4.x as their minimum supported version, and 92.6% run on Android 4.x or older. Targeting Android 4.0+ captures virtually the entire addressable market while avoiding legacy Android 2.x debt.",
        metric: "92.6% Ecosystem Coverage",
      },
    ],
    architecture: {
      description: "10-sheet interactive Excel workbook engineered with 100% native dynamic formulas and zero hardcoded outputs.",
      sheetLayout: [
        { sheet: "About", focus: "Overview, data dictionaries, methodology, and version control" },
        { sheet: "Dashboard", focus: "12 dynamic KPI scorecards, interactive category dropdown, and 6 charts" },
        { sheet: "Findings", focus: "Formula-generated analytical narrative and strategic recommendations" },
        { sheet: "Analysis", focus: "Comprehensive analytical tables (5 master tables) backing the entire model" },
        { sheet: "Cleaning_Log", focus: "Row-by-row audit log of all data cleaning transformations" },
        { sheet: "Clean_Android / Clean_iOS", focus: "Cleaned datasets with enriched classification helper formulas" },
        { sheet: "Raw_Android / Raw_iOS", focus: "Raw CSV records exactly as downloaded (10,841 + 7,197 rows)" },
        { sheet: "Category_Map", focus: "18 cross-platform category pairings used across all lookups" },
      ],
      codeSnippet: `=IF($C$3="All categories", COUNTIFS(Clean_Android!$B:$B, "<>"), COUNTIFS(Clean_Android!$B:$B, $C$3))
=AVERAGEIFS(Clean_iOS!$H:$H, Clean_iOS!$L:$L, Category_Map!$A2, Clean_iOS!$H:$H, ">0")
=INDEX(Analysis!$D$14:$D$31, MATCH(Dashboard!$C$3, Analysis!$B$14:$B$31, 0))`,
      language: "Excel Formulas",
    },
    recommendations: [
      { role: "Product Managers", text: "Adopt freemium/IAP models on Android; avoid upfront paywalls. Benchmark strictly against iOS grievances when launching Sports or Finance apps." },
      { role: "Mobile Engineering", text: "Establish a monthly CI/CD release cadence to stay in the 70.5% high-engagement tier. Build internationalization (i18n) for 10+ languages early." },
      { role: "Growth & Marketing", text: "Treat 1,000 ratings as the critical algorithmic inflection point where store discoverability compounds." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis/main/images/dashboard.png",
        caption: "Interactive Excel Dashboard featuring 12 dynamic KPI scorecards, interactive category selector dropdown, and 6 synchronized charts.",
        alt: "Mobile App Market Analysis Interactive Dashboard",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis/main/images/findings.png",
        caption: "Formula-driven Key Findings sheet dynamically compiling executive insights from analytical tables.",
        alt: "Strategic Findings Sheet",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis/main/images/analysis_tables_1.png",
        caption: "Master Table 1: Macro Ecosystem Benchmarks & 18 Cross-Platform Category Pairings.",
        alt: "Analysis Table 1",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis/main/images/analysis_tables_2.png",
        caption: "Master Table 2: Pricing Tiers, App Bundle Size Bands, and Bimodal vs Bell-Curve Rating Distributions.",
        alt: "Analysis Table 2",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Mobile-App-Market-Analysis/main/images/cleaning_log.png",
        caption: "Data Cleaning Audit Trail: Documenting transformations across missing values, type casts, and deduplication.",
        alt: "Data Cleaning Log",
      },
    ],
    tags: ["Excel", "Data Analysis", "EDA", "Dashboard Design", "Formulas", "Product Analytics"],
  },

  {
    id: "excel-telco-churn",
    category: "Excel",
    categoryLabel: "Commercial Analytics & Risk Modeling",
    categoryBadgeColor: "var(--yellow)",
    title: "Telco Customer Churn & Retention Analytics",
    subtitle: "End-to-End Retention Modeling, Revenue Exposure Quantification & Targeted Commercial Intervention Simulator in Excel",
    repoUrl: "https://github.com/moazzem-hossain-majumder/excel-telco-churn",
    repoName: "excel-telco-churn",
    highlightBadge: "7,043 Accounts • $139K Churn Leak • Risk Scoring",
    featured: true,
    overview:
      "An end-to-end commercial analytics project in Microsoft Excel evaluating customer retention, revenue exposure, and actionable intervention strategies for a subscription telecom business. Quantifies portfolio churn, identifies high-loss customer cohorts, builds an interpretable 7-dimension points-based risk scoring framework, and models targeted commercial retention programs.",
    problemStatement:
      "Subscription churn represents a direct leak in recurring revenue and increases customer acquisition pressure. Telecom operators struggle with untargeted retention promotions that waste budget on customers who would stay anyway or fail to save customers at the point of cancellation.",
    businessQuestions: [
      "What is the baseline churn rate and total recurring revenue exposure?",
      "Which customer cohorts, service tiers, and contract structures exhibit the greatest loss?",
      "Can at-risk accounts be effectively ranked using an interpretable risk scoring framework?",
      "What is the financial return and net ROI of targeted commercial retention initiatives?",
    ],
    dataset: {
      name: "IBM Telco Customer Churn Benchmark Dataset",
      scale: "7,043 customer accounts across 21 commercial and demographic attributes",
      sources: "IBM Sample Dataset via Kaggle",
      cleaningNotes: "Standardized numeric fields, cross-verified unbilled zero-tenure accounts, confirmed zero missing records, and engineered tenure cohorts, spend bands, and priority ranking keys.",
    },
    kpis: [
      { label: "Total Customer Accounts", value: "7,043", note: "Across 21 commercial attributes", color: "var(--blue)" },
      { label: "Churned Accounts", value: "1,869 (26.5%)", note: "Baseline portfolio churn rate", color: "var(--red)" },
      { label: "Monthly Recurring Revenue", value: "$456,117", note: "Total baseline monthly portfolio", color: "var(--green)" },
      { label: "Monthly Churn Exposure", value: "$139,131", note: "30.5% recurring revenue lost each month", color: "var(--red)" },
      { label: "Tenure Retained vs Churned", value: "37.6 vs 18.0 mos", note: "First year is primary vulnerability window", color: "var(--yellow)" },
      { label: "Net Retention Protection", value: "$163,500/yr", note: "Net annualized revenue protected in simulation", color: "var(--purple)" },
    ],
    findings: [
      {
        title: "Contract type is the single largest churn determinant",
        desc: "Month-to-month customers churn at 42.7%, compared to 11.3% for 1-year and 2.8% for 2-year contracts. Although month-to-month accounts comprise 55.0% of the portfolio, they represent 88.6% of all churned customers.",
        metric: "42.7% Churn Rate",
      },
      {
        title: "First-year tenure is the primary vulnerability window",
        desc: "Accounts in their first 12 months churn at 47.4%, compared to 9.5% for accounts past four years. Month-to-month accounts within year one churn at 51.4%, accounting for 54.8% of total churners.",
        metric: "51.4% Year-1 M2M Churn",
      },
      {
        title: "Fiber optic service experiences elevated churn despite higher ARPU",
        desc: "Fiber optic customers churn at 41.9% (vs. 19.0% for DSL and 7.4% for no internet), despite contributing an average monthly spend of $91.50 (vs. $58.10 for DSL). Month-to-month fiber customers churn at 54.6%.",
        metric: "$91.50 ARPU vs 41.9% Churn",
      },
      {
        title: "Security and support add-ons correlate strongly with retention",
        desc: "Among internet subscribers, churn is 41.6% without Tech Support versus 15.2% with it, and 41.8% without Online Security versus 14.6% with it. Entertainment add-ons (streaming video/TV) show negligible retention difference.",
        metric: "15.2% vs 41.6% Churn",
      },
      {
        title: "Risk scoring successfully concentrates exposure",
        desc: "The High-Risk tier represents 30.3% of the customer base but captures 66.3% of all churners (58.0% segment churn rate), while the Low-Risk tier churns at just 4.6%. 897 active high-risk accounts currently account for $64,701 in monthly spend.",
        metric: "66.3% Churners in Top Tier",
      },
    ],
    architecture: {
      description: "Comprehensive financial model featuring 15 cross-tab tables, a 7-dimension points-based scoring model, and a commercial scenario simulator.",
      sheetLayout: [
        { sheet: "Cover", focus: "Project objectives, scope summary, sheet directory, and formatting standards" },
        { sheet: "Dashboard", focus: "Dynamic KPI summary and cohort charts with interactive segment filters" },
        { sheet: "Insights", focus: "Strategic synthesis of key empirical findings and commercial implications" },
        { sheet: "Analysis", focus: "15 detailed cross-tabulation tables across portfolio drivers, cohorts, and service matrices" },
        { sheet: "Risk_Model", focus: "Calibrated points scoring system ranking account churn likelihood into risk tiers" },
        { sheet: "Retention_Scenario", focus: "Scenario simulator modeling protected volume and ROI under incentive costs" },
        { sheet: "Retention_Call_List", focus: "Ranked list of top 25 active at-risk accounts prioritized by spend for outreach" },
        { sheet: "Cleaning_Log", focus: "Documented data hygiene transformations and validation cross-checks" },
      ],
      codeSnippet: `=SUMPRODUCT((Clean_Data!$C$2:$C$7044=$A4)*(Clean_Data!$T$2:$T$7044="Yes")*Clean_Data!$R$2:$R$7044)
=VLOOKUP(Score_Total, Risk_Bands_Table, 2, TRUE)
=SUMIFS(Clean_Data!$MonthlyCharges, Clean_Data!$RiskTier, "High", Clean_Data!$Churn, "No")`,
      language: "Excel Formulas & Modeling",
    },
    recommendations: [
      { role: "Commercial Strategy", text: "Introduce targeted migration incentives (discounts or perks) to convert month-to-month subscribers onto 1-year commitments." },
      { role: "Customer Success", text: "Implement a structured 12-month onboarding sequence to address early-life tenure vulnerability." },
      { role: "Retention Operations", text: "Arm retention specialists with the dynamic Priority Call List to proactively engage high-spend accounts in the High-Risk tier." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-telco-churn/main/images/dashboard.png",
        caption: "Executive Dashboard: Visualizing baseline churn, revenue loss breakdown, cohort risk distributions, and interactive filters.",
        alt: "Telco Churn Executive Dashboard",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-telco-churn/main/images/insights.png",
        caption: "Strategic Insights: Commercial implications and data-backed findings formatted for C-suite decision makers.",
        alt: "Strategic Insights Sheet",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-telco-churn/main/images/risk_model.png",
        caption: "Predictive Risk Model: Calibrated points scoring system categorizing customers into Low, Medium, and High-Risk tiers.",
        alt: "Predictive Risk Model",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-telco-churn/main/images/retention_scenario.png",
        caption: "Commercial Retention Scenario Simulator: Calculating protected accounts, gross revenue saved, and net ROI after incentive costs.",
        alt: "Retention Scenario Simulator",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-telco-churn/main/images/retention_call_list.png",
        caption: "Tactical Priority Call List: Dynamically ranking active high-spend, high-risk accounts for proactive outreach.",
        alt: "Retention Call List",
      },
    ],
    tags: ["Excel", "Churn Analysis", "Financial Modeling", "Cohort Analysis", "Risk Scoring", "Scenario Analysis"],
  },

  {
    id: "excel-superstore-sales",
    category: "Excel",
    categoryLabel: "Retail Analytics & Profitability",
    categoryBadgeColor: "var(--blue)",
    title: "Superstore Sales & Profitability Analysis",
    subtitle: "Comprehensive 4-Year Retail Performance Audit, Margin Leak Diagnosis & Dynamic Filtering in Excel",
    repoUrl: "https://github.com/moazzem-hossain-majumder/excel-superstore-sales",
    repoName: "excel-superstore-sales",
    highlightBadge: "9,993 Order Lines • $2.3M Sales • Discount Leak Audit",
    featured: true,
    overview:
      "An end-to-end Excel analysis of four years of retail orders (2014-2017): data hygiene, formula-driven multidimensional analysis, an interactive executive dashboard, customer lookup tool, and actionable business recommendations to reverse chronic margin leaks.",
    problemStatement:
      "Retailers often focus on topline revenue growth while gross margins stagnate or collapse due to unchecked discounting, unprofitable sub-categories, and high-maintenance enterprise accounts.",
    businessQuestions: [
      "Which regions, categories, and sub-categories drive sales vs. net profit?",
      "How do sales and profitability trend across multi-year cycles and peak holiday seasonality?",
      "How severely does excessive discounting destroy product gross margins?",
      "Who are the top customers, and are high-volume enterprise buyers actually profitable?",
      "Which specific products and sub-categories cause negative cash flows?",
    ],
    dataset: {
      name: "Superstore Retail Orders (US)",
      scale: "9,994 raw rows x 21 columns (9,993 clean order lines, 5,009 unique orders, 793 customers)",
      sources: "Superstore Dataset by Vivek Chowdhury (Kaggle)",
      cleaningNotes: "Handled Windows-1252 encoding, converted text dates to ISO timestamps, preserved 5-digit postal codes as text, eliminated exact duplicate row, and cleansed non-breaking spaces.",
    },
    kpis: [
      { label: "Total Gross Sales", value: "$2,296,919", note: "52% growth from 2014 to 2017", color: "var(--blue)" },
      { label: "Total Net Profit", value: "$286,409", note: "12.5% overall portfolio profit margin", color: "var(--green)" },
      { label: "Total Unique Orders", value: "5,009", note: "9,993 individual order lines", color: "var(--yellow)" },
      { label: "Loss-Making Order Lines", value: "18.7%", note: "Nearly 1 in 5 orders lost company money", color: "var(--red)" },
      { label: "Discounts >20% Loss", value: "-$135,364", note: "Severe margin erosion (-15.3% to -77.4%)", color: "var(--red)" },
      { label: "Top Customer Loss", value: "-$1,981", note: "Largest customer Sean Miller was unprofitable", color: "var(--pink)" },
    ],
    findings: [
      {
        title: "Growth is strong, but margin is flat",
        desc: "Sales grew 52% from 2014 to 2017 ($483,966 to $733,215), but margin moved only from 10.2% to 12.7% and was highest in 2016 (13.4%).",
        metric: "+52% Sales vs Flat Margin",
      },
      {
        title: "Discounting is the single largest profit leak",
        desc: "Lines discounted above 20% brought in $362,489 in sales but lost -$135,364 (margin -15.3% for 21-40% discounts, -77.4% above 40%). In contrast, undiscounted lines earned a healthy 29.5% margin.",
        metric: "-$135,364 Lost on >20% Discounts",
      },
      {
        title: "Three sub-categories chronically lose money",
        desc: "Tables (-$17,725), Bookcases (-$3,473), and Supplies (-$1,189) operate at sustained negative margins. As a result, Furniture earns only a 2.5% margin versus 17.4% for Technology.",
        metric: "Furniture 2.5% vs Tech 17.4%",
      },
      {
        title: "Regional and state divergence",
        desc: "The West region has the best margin (14.9%) while Central is the weakest (7.9%). Texas (-$25,729), Ohio (-$16,959), and Pennsylvania (-$15,560) are the largest loss-making states.",
        metric: "Texas -$25,729 Loss",
      },
      {
        title: "Top customer concentration anomaly",
        desc: "The top 10 of 793 customers contribute 6.7% of sales. However, the single largest customer (Sean Miller, $25,043 in sales) is net unprofitable (-$1,981 profit) due to heavy discounting.",
        metric: "Sean Miller -$1,981 Profit",
      },
    ],
    architecture: {
      description: "10-sheet analytical workbook featuring 14 formula-driven analytical tables, customer lookup engine, and interactive dropdown-filtered charts.",
      sheetLayout: [
        { sheet: "Cover", focus: "Objective, dataset, sheet guide, colour legend" },
        { sheet: "Dashboard", focus: "KPI cards and 5 charts, filtered by Year / Region / Segment / Category drop-downs" },
        { sheet: "Insights", focus: "Seven findings (numbers built with formulas), why they matter, recommendations" },
        { sheet: "Analysis", focus: "14 formula-driven tables (year, region, category, segment, sub-category, ship mode, discount bands, heat-maps)" },
        { sheet: "Customer_Lookup", focus: "Interactive tool to pick a customer and view sales, profit, orders, dates, and percentile rank" },
        { sheet: "Cleaning_Log", focus: "Every cleaning step with row counts (mostly live formulas)" },
        { sheet: "Clean_Data", focus: "Cleaned table plus helper-formula columns (teal headers)" },
      ],
      codeSnippet: `=SUMIFS(Clean_Data!$Sales, Clean_Data!$Region, $B$4, Clean_Data!$Year, $B$2)
=INDEX(Clean_Data!$Customer_Name, MATCH(LARGE(Calc_Customers!$B:$B, 1), Calc_Customers!$B:$B, 0))
=IF(Clean_Data!$Discount>0.2, "High Discount - Loss Alert", "Normal")`,
      language: "Excel Formulas",
    },
    recommendations: [
      { role: "Pricing Policy", text: "Cap routine salesperson discounts at 20% and require managerial approval above it; test whether deep discounts actually increase volume." },
      { role: "Merchandising", text: "Review pricing, supplier cost, and freight rules for Tables, Bookcases, and Supplies; delist items that remain chronically negative." },
      { role: "Sales Operations", text: "Audit discounts given to top enterprise accounts (e.g. Sean Miller) and enforce margin floors." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-superstore-sales/main/images/dashboard.png",
        caption: "Interactive Superstore Dashboard: Dynamic KPI cards and 5 charts filtered by Year, Region, Segment, and Category dropdowns.",
        alt: "Superstore Sales Dashboard",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-superstore-sales/main/images/insights.png",
        caption: "Strategic Insights: Seven formula-computed findings, commercial rationale, and immediate managerial action items.",
        alt: "Superstore Insights Sheet",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-superstore-sales/main/images/analysis_tables.png",
        caption: "Master Analytical Tables: 14 formula-backed cross-tabulations covering regional performance, discount bands, and seasonality.",
        alt: "Analytical Tables",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-superstore-sales/main/images/customer_lookup.png",
        caption: "Dynamic Customer Lookup Sheet: Enter or select any customer to instantly inspect lifetime orders, sales, profit, and profitability status.",
        alt: "Customer Lookup Tool",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/excel-superstore-sales/main/images/cleaning_log.png",
        caption: "Data Hygiene Audit Log: Documenting encoding, date parsing, postal code formatting, and duplicate checks.",
        alt: "Cleaning Log",
      },
    ],
    tags: ["Excel", "Sales Analytics", "Retail", "Profitability Analysis", "Dashboards", "Customer Segmentation"],
  },

  // =========================================================================
  // 2. SQL & RELATIONAL DATABASES
  // =========================================================================
  {
    id: "sql-ios-appstore-analytics",
    category: "SQL",
    categoryLabel: "MySQL 8.0 & Relational Architecture",
    categoryBadgeColor: "var(--pink)",
    title: "iOS App Store Product Analytics & Relational Database Architecture",
    subtitle: "Production MySQL 8.0 Warehouse, 3NF Schema, User Telemetry Funnels & Crash-Induced Churn Causality Pipeline",
    repoUrl: "https://github.com/moazzem-hossain-majumder/ios_appstore_product_analytics_mysql",
    repoName: "ios_appstore_product_analytics_mysql",
    highlightBadge: "MySQL 8.0 • 7,197 Apps • 5-Stage Funnel • Procedures & Triggers",
    featured: true,
    overview:
      "A production-grade MySQL 8.0 engineering and analytics portfolio designed for TwinBit Limited (Dhaka, Bangladesh). Builds a normalized 3NF data warehouse across 7,197 real iOS applications and 5,000 granular user subscription telemetry events. Implements automated audit triggers, deterministic rating functions, parameterized stored procedures, conversion funnels, and mathematical proof of app crashes doubling subscription churn.",
    problemStatement:
      "Operating in the global iOS mobile app ecosystem requires empirical evidence on app store optimization (ASO), pricing strategy, and subscriber lifecycle mechanics. Relying on flat CSV spreadsheets causes data corruption, lack of relational integrity, zero concurrency support, and inability to trace causal user behavior.",
    businessQuestions: [
      "What is the exact return on investment for international language localization and iPad tablet asset readiness?",
      "What are the empirical category pricing and rating benchmarks across Photo & Video, Utilities, Productivity, and Health & Fitness?",
      "Where does prospective subscriber drop-off occur across the 5-stage conversion funnel?",
      "Does client-side technical instability (app crashes) have an empirical causal impact on paid subscription churn?",
      "Which user acquisition channels (Apple Search Ads, Organic, Meta Ads, TikTok) deliver the highest net financial yield?",
    ],
    dataset: {
      name: "Apple iTunes Search API & User Telemetry",
      scale: "7,197 iOS catalog apps + 7,197 text descriptions + 5,000 granular telemetry events (1,763 unique users)",
      sources: "Apple iTunes Search API (Ramanathan Perumal / Finn Qiao) + Granular Subscription Telemetry Events",
      cleaningNotes: "Staged raw tables, executed CTE-based deduplication using ROW_NUMBER(), normalized currency and strings, used REGEXP_REPLACE for iOS versions, and sanitized session outliers.",
    },
    kpis: [
      { label: "Production Ingestion", value: "7,197 Apps", note: "100% relational integrity verified", color: "var(--blue)" },
      { label: "Localization Lift", value: "+153.3% Volume", note: "Multi-language apps average 19K vs 7.5K ratings", color: "var(--green)" },
      { label: "iPad Screenshot Lift", value: "+0.91 Stars", note: "Optimized apps average 3.70 vs 2.79 unoptimized", color: "var(--yellow)" },
      { label: "Funnel Conversion", value: "10.21% Paid", note: "180 paid conversions from 1,763 installs", color: "var(--purple)" },
      { label: "Crash Churn Impact", value: "50.0% vs 21.3%", note: "Crashes double subscription cancellation rate", color: "var(--red)" },
      { label: "Top Channel Yield", value: "11.88% TikTok", note: "TikTok ads highest conversion efficiency", color: "var(--pink)" },
    ],
    findings: [
      {
        title: "Category Benchmarking across Core Portfolio",
        desc: "Productivity yields the highest average star rating (4.01) and command of premium pricing ($4.33 average price). Utilities presents the lowest rating (3.28), indicating consumer dissatisfaction with incumbent utility apps and a clear opening to launch clean, high-stability utilities.",
        metric: "Productivity 4.01 vs Utilities 3.28",
      },
      {
        title: "ASO Drivers: Multi-Language & Tablet Readiness",
        desc: "Multi-language localization generates a 153.3% increase in average rating volume and a 0.33 rating lift. iPad screenshot optimization prevents a catastrophic 0.91 star rating penalty (2.79 versus 3.70).",
        metric: "+153.3% Rating Volume",
      },
      {
        title: "5-Stage Subscription Conversion Funnel",
        desc: "Tracking 1,763 unique users: 1. Install (1,763, 100%) -> 2. Onboarding (1,481, 83.99%) -> 3. Paywall Viewed (966, 54.80%) -> 4. Free Trial Started (315, 17.87%) -> 5. Trial Converted Paid (180, 10.21%). Primary leak: 67.39% drop-off between Paywall and Free Trial.",
        metric: "67.39% Drop-off at Paywall",
      },
      {
        title: "Client-Side Stability Directly Defends Recurring Revenue",
        desc: "Subscribers encountering client-side app crashes cancel subscriptions at more than double the baseline rate (50.00% cancellation rate versus 21.26% for crash-free users). Technical stability directly protects ARR.",
        metric: "50% vs 21.3% Churn Rate",
      },
      {
        title: "Acquisition Channel ROI & Net Yield",
        desc: "TikTok Ads displays the highest conversion efficiency (11.88%), while Apple Search Ads provides the highest volume ($1,840.13 net after Apple 15% Small Business cut).",
        metric: "11.88% TikTok vs $1,840 ASA",
      },
    ],
    architecture: {
      description: "Production normalized 3NF database schema featuring automated audit triggers, stored procedures, deterministic functions, and BI reporting views.",
      sheetLayout: [
        { sheet: "stg_apple_store", focus: "Permissive raw staging table for bulk CSV ingestion" },
        { sheet: "dim_ios_apps", focus: "Normalized dimension table with check constraints and generated size_mb column" },
        { sheet: "dim_app_descriptions", focus: "Application marketing text and character counts with ON DELETE CASCADE" },
        { sheet: "fact_user_telemetry", focus: "High volume transactional fact table with stored generated net_revenue column" },
        { sheet: "audit_price_changes", focus: "Automated audit trail logging old/new price, diff, user, and timestamp" },
        { sheet: "Views & Procedures", focus: "vw_executive_genre_kpis, sp_get_genre_monetization_report, fn_calculate_app_visibility_score" },
      ],
      codeSnippet: `-- In Situ Deduplication using Chained Window Functions
WITH cte_duplicate_apps AS (
    SELECT id, ROW_NUMBER() OVER (
        PARTITION BY id ORDER BY rating_count_tot DESC, row_idx ASC
    ) AS ranking_val
    FROM stg_apple_store
    WHERE id IS NOT NULL
)
DELETE target_table
FROM stg_apple_store target_table
INNER JOIN cte_duplicate_apps ranking_ref
    ON target_table.id = ranking_ref.id
WHERE ranking_ref.ranking_val > 1;

-- Causal Churn Analysis: App Crash Impact on Paid Subscribers
SELECT 
    CASE WHEN has_crash_event = 1 THEN 'Users Logging App Crashes'
         ELSE 'Users Without Crashes' END AS user_segment,
    COUNT(DISTINCT user_id) AS total_paid_users,
    SUM(is_cancelled) AS cancellations,
    ROUND(100.0 * SUM(is_cancelled) / COUNT(DISTINCT user_id), 2) AS cancellation_rate
FROM fact_user_telemetry
WHERE subscription_tier = 'paid'
GROUP BY 1;`,
      language: "MySQL 8.0",
    },
    recommendations: [
      { role: "Product Strategy", text: "Address the 67.4% paywall drop-off by testing annual billing trials and transparent cancellation guarantees." },
      { role: "Mobile Engineering", text: "Prioritize crash resolution over new features: eliminating crashes will immediately cut paid subscription churn in half." },
      { role: "Growth Marketing", text: "Scale video creatives on TikTok Ads (11.88% conversion) while protecting ASA for exact keyword capture." },
    ],
    images: [],
    tags: ["MySQL 8.0", "Database Architecture", "3NF Schema", "Stored Procedures", "Triggers", "Conversion Funnels", "Cohort Analysis"],
  },

  {
    id: "sql-olist-ecommerce",
    category: "SQL",
    categoryLabel: "PostgreSQL 16 & Relational Analytics",
    categoryBadgeColor: "var(--purple)",
    title: "Olist Brazilian E-Commerce Analytics (PostgreSQL)",
    subtitle: "PostgreSQL Database Architecture, 44 Business Queries, RFM Deciles & Late-Delivery Satisfaction Analysis across 100K Orders",
    repoUrl: "https://github.com/moazzem-hossain-majumder/Data-Analyst-Portfolio/tree/main/02-sql/project-1-olist-ecommerce",
    repoName: "Data-Analyst-Portfolio (02-sql/project-1-olist-ecommerce)",
    highlightBadge: "PostgreSQL 16 • 100K Orders • 44 Queries • 8-Table ERD",
    featured: true,
    overview:
      "A comprehensive SQL analysis of about 100,000 orders from a Brazilian online marketplace. Built the relational database from raw CSV files, enforced primary/foreign keys and check constraints, performed 10 data quality checks, and wrote 44 analytical queries answering business questions about sales velocity, customer repeat rates, seller geography, and the impact of delivery delays on review ratings.",
    problemStatement:
      "Marketplaces experience growth plateaus and customer churn due to logistics bottlenecks, seller concentration, and poor repeat purchase economics. Analyzing multi-table marketplace data without robust schema design risks the 'join fan-out trap' (inflating revenue across multi-item/multi-payment orders) and biased reporting.",
    businessQuestions: [
      "How did marketplace revenue trend over time, and what was the impact of Black Friday spikes?",
      "What is the customer repeat purchase rate, and how is spend distributed across customer deciles?",
      "How do delivery delays impact customer satisfaction and 1-star review probabilities?",
      "Which product categories carry excessive freight costs relative to item price?",
      "How concentrated is seller revenue geographically across Brazilian states?",
    ],
    dataset: {
      name: "Brazilian E-Commerce Public Dataset by Olist",
      scale: "100,000 orders (96,478 delivered), 93,358 unique customers, 112,000 order items, 3,000 active sellers, R$13.2M revenue",
      sources: "Olist Brazilian E-Commerce Dataset (Kaggle)",
      cleaningNotes: "Handled non-unique review_id source quirk, mapped customer_id to customer_unique_id, enforced foreign keys to prevent orphan rows, and built v_order_summary to aggregate items and payments independently.",
    },
    kpis: [
      { label: "Delivered Orders", value: "96,478", note: "R$13.2M total delivered revenue", color: "var(--blue)" },
      { label: "Average Order Value", value: "R$137", note: "Median R$105, top 1% > R$1,052", color: "var(--green)" },
      { label: "Repeat Purchase Rate", value: "3.0%", note: "97.0% of buyers placed only 1 order", color: "var(--red)" },
      { label: "Top 10% Spenders Share", value: "41.1%", note: "Bottom 50% generate only 16.7%", color: "var(--purple)" },
      { label: "On-Time vs Late Reviews", value: "4.28 vs 1.69", note: "8+ days late drops rating to 1.69 stars", color: "var(--red)" },
      { label: "São Paulo Dominance", value: "38.3% Rev", note: "59.6% of sellers in SP produce 64.4% revenue", color: "var(--yellow)" },
    ],
    findings: [
      {
        title: "The marketplace grew fast, then leveled off",
        desc: "Delivered-order revenue rose from R$112K in Jan 2017 to a Black Friday peak of R$988K in Nov 2017 (+52.4% on the month, then -26.5% in December). Year-over-year growth cooled from +727% in January to +51% in August 2018.",
        metric: "R$988K Black Friday Peak",
      },
      {
        title: "Almost nobody comes back (3.0% repeat rate)",
        desc: "97.0% of customers placed exactly one order; only 2.8% ordered twice and 0.24% three or more times. For the 2017 cohorts, just 0.52% bought again in the following month and about 0.25% in each of months 3-6.",
        metric: "97.0% One-Time Buyers",
      },
      {
        title: "Late delivery is the biggest driver of negative reviews",
        desc: "Orders delivered on time average 4.28 stars (9.5% negative). Arriving 1-3 days late drops that to 3.28 (32.4% negative), 4-7 days late to 2.09 (68.1%), and 8+ days late to 1.69 (79.5% negative reviews).",
        metric: "79.5% Negative Reviews on 8+ Days Late",
      },
      {
        title: "Cheap items carry heavy shipping burdens",
        desc: "For items under R$50, freight equals 47% of the price (versus 5% above R$500). Freight is highest relative to price in electronics (29.5%), office_furniture (25.0%), and furniture_decor (23.7%).",
        metric: "Freight = 47% of Price (<R$50)",
      },
      {
        title: "Customer RFM spend concentration",
        desc: "Top 10% of customers generate 41.1% of revenue. One-time buyers who spent heavily but never returned ('Lapsed big spenders') make up 22.2% of customers and 42.0% of revenue, the single largest re-engagement pool.",
        metric: "42.0% Revenue in Lapsed Spenders",
      },
    ],
    architecture: {
      description: "8-table relational PostgreSQL schema with 44 numbered queries across 9 modular scripts, featuring reusable views, materialized views, and EXPLAIN ANALYZE tuning.",
      sheetLayout: [
        { sheet: "01_schema.sql", focus: "Tables, primary keys, foreign keys, check constraints, and 7 indexes" },
        { sheet: "02_load_data.sql", focus: "Bulk \\copy loads for the 8 CSVs with FORCE_NULL handling" },
        { sheet: "03_data_quality_checks.sql", focus: "Q01-Q10: orphan rows, null checks, duplicate keys, date reconciliation" },
        { sheet: "04_views.sql", focus: "Reusable views (v_order_summary, v_order_review) + materialized view" },
        { sheet: "05_sales_analysis.sql", focus: "Q11-Q22: monthly revenue, growth rates, category share, installments" },
        { sheet: "06_customer_analysis.sql", focus: "Q23-Q28: cohort retention, RFM segmentation, customer spend deciles" },
        { sheet: "07_seller_product_analysis.sql", focus: "Q29-Q36: Pareto seller distribution, freight ratios, basket sizes" },
        { sheet: "08_delivery_satisfaction.sql", focus: "Q37-Q44: delivery vs estimate, review score degradation, repeat offender sellers" },
        { sheet: "09_performance_tuning.sql", focus: "Index vs sequential scan benchmarking with EXPLAIN ANALYZE" },
      ],
      codeSnippet: `-- Avoiding Join Fan-Out Trap (Aggregating items and payments before joining)
WITH items AS (SELECT order_id, SUM(price) AS items_value FROM order_items GROUP BY order_id),
     pay   AS (SELECT order_id, SUM(payment_value) AS paid_value FROM order_payments GROUP BY order_id)
SELECT o.order_id, i.items_value, p.paid_value
FROM orders o
LEFT JOIN items i USING (order_id)
LEFT JOIN pay   p USING (order_id);

-- Measuring the Direct Impact of Late Delivery on Review Scores (Q41)
SELECT CASE WHEN s.days_vs_estimate <= 0 THEN '1 On time or early'
            WHEN s.days_vs_estimate <= 3 THEN '2 Late by 1-3 days'
            WHEN s.days_vs_estimate <= 7 THEN '3 Late by 4-7 days'
            ELSE '4 Late by 8+ days' END                   AS delivery_outcome,
       COUNT(*)                                            AS orders,
       ROUND(AVG(r.review_score), 2)                       AS avg_review_score,
       ROUND(100.0 * AVG((r.review_score <= 2)::int), 1)   AS pct_negative_reviews
FROM v_order_summary s
JOIN v_order_review r USING (order_id)
WHERE s.order_status = 'delivered' AND s.days_vs_estimate IS NOT NULL
GROUP BY 1 ORDER BY 1;`,
      language: "PostgreSQL 16",
    },
    recommendations: [
      { role: "Operations & Logistics", text: "Protect delivery promises during Q4 Black Friday and Feb-Mar spikes: adding carrier buffer prevents the severe 1.69-star review collapse." },
      { role: "Seller Management", text: "Audit the top 10 worst seller offenders where late delivery exceeds 19% (nearly 3x the platform average of 6.8%)." },
      { role: "Growth Marketing", text: "Build an automated second-order incentive sequence targeting 'Lapsed big spenders' (42.0% of revenue) to lift the 3.0% repeat rate." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Data-Analyst-Portfolio/main/02-sql/project-1-olist-ecommerce/images/review_vs_delivery.png",
        caption: "Review Score vs Delivery Delay: Empirical proof of satisfaction dropping from 4.28 stars on-time down to 1.69 stars when >8 days late.",
        alt: "Review Score vs Delivery Delay",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Data-Analyst-Portfolio/main/02-sql/project-1-olist-ecommerce/images/monthly_revenue.png",
        caption: "Monthly Revenue Trajectory: Fast growth from Jan 2017 to the R$988K Black Friday peak, followed by stabilization in 2018.",
        alt: "Monthly Delivered Revenue",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Data-Analyst-Portfolio/main/02-sql/project-1-olist-ecommerce/images/customer_deciles.png",
        caption: "Customer Spend Deciles: Showing the top 10% of customers contributing 41.1% of marketplace sales.",
        alt: "Customer Deciles",
      },
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Data-Analyst-Portfolio/main/02-sql/project-1-olist-ecommerce/images/late_delivery_by_month.png",
        caption: "Late Deliveries by Month: Lateness spikes during seasonal demand peaks (12.4% Nov 2017, 19.0% March 2018).",
        alt: "Late Delivery by Month",
      },
    ],
    tags: ["PostgreSQL", "SQL", "E-Commerce", "Window Functions", "RFM Segmentation", "Cohort Analysis", "Data Modeling"],
  },

  // =========================================================================
  // 3. PYTHON DATA SCIENCE & ANALYTICS
  // =========================================================================
  {
    id: "python-telecom-churn-ml",
    category: "Python",
    categoryLabel: "Machine Learning & Statistical Audit",
    categoryBadgeColor: "var(--blue)",
    title: "Telecom Churn Prediction on Cell2Cell Benchmark",
    subtitle: "Leakage-Controlled ML Pipeline, 80/20 Pre-Split, In-Fold SMOTE & 7 Baseline Model Ablation on 51,047 Records",
    repoUrl: "https://github.com/moazzem-hossain-majumder/Telecom-Churn-Prediction",
    repoName: "Telecom-Churn-Prediction",
    highlightBadge: "51,047 Records • Leakage Audit • 7 Models Compared • IEEE Paper",
    featured: true,
    overview:
      "A rigorous statistical and machine learning project predicting customer churn for a US telecom carrier using the classic Cell2Cell benchmark dataset. Specifically focused on auditing and resolving the rampant data-leakage and inflated-metric issues found in prior academic literature, demonstrating that true held-out F1 scores land around ~0.40 rather than the inflated 80–99% figures often reported.",
    problemStatement:
      "Acquiring a new telecom customer costs 5–10x more than retaining an existing one. While over 20 published papers report accuracies up to 99% on Cell2Cell, almost none report calibration, significance testing, or leakage-free cross-validation. Data leakage during preprocessing or applying SMOTE prior to CV folds creates disastrous real-world deployment failures.",
    businessQuestions: [
      "What are the realistic, leakage-controlled predictive metrics for churn on the 51,047-customer Cell2Cell benchmark?",
      "Which specific logical feature groups (Usage, Equipment, Calling Quality, Demographics) drive churn propensity?",
      "How does in-fold SMOTE handling prevent artificial data contamination?",
      "What is the precision-recall trade-off when optimizing for telecom customer intervention programs?",
    ],
    dataset: {
      name: "Cell2Cell Benchmark Dataset (Teradata CRM Center, Duke University)",
      scale: "51,047 customer records across 58 raw features (~29% positive churn class)",
      sources: "Duke University Teradata Center for CRM via Kaggle",
      cleaningNotes: "Strict 80/20 train/test split executed BEFORE any cleaning or EDA. Train-set-only 99th percentile capping, KNN & median imputation, mode imputation, and collapsing 748 service areas to 15 major hubs.",
    },
    kpis: [
      { label: "Customer Records", value: "51,047", note: "58 raw behavioral & billing features", color: "var(--blue)" },
      { label: "Evaluation Split", value: "80/20 Pre-Split", note: "Test set touched exactly once at final evaluation", color: "var(--green)" },
      { label: "Cross-Validation", value: "5-Fold In-Fold SMOTE", note: "Zero synthetic leakage across CV folds", color: "var(--yellow)" },
      { label: "Top Held-Out F1", value: "0.408 (AdaBoost)", note: "0.405 (Logistic Regression All-Features)", color: "var(--purple)" },
      { label: "Literature Gap", value: "0.40 vs 0.90+", note: "Proving published 90%+ claims rely on leakage", color: "var(--red)" },
      { label: "Academic Output", value: "IEEE Format", note: "Full written research report in repository", color: "var(--pink)" },
    ],
    findings: [
      {
        title: "Ablation Study reveals Equipment and Usage as top predictors",
        desc: "Feature grouping ablation demonstrated that Equipment (handset age, models, refurb status) and Usage (minutes, roaming, peak calls) consistently yield the highest validation F1 scores across diverse model families.",
        metric: "Equipment & Usage Rank #1",
      },
      {
        title: "Rigorous Leakage Control deflates artificial accuracy",
        desc: "Under a strict protocol where test data is never seen during imputation, scaling, or resample weighting, F1 scores across all 7 models land tightly around 0.35–0.41. Prior claims of 85–99% accuracy were driven by post-split leakage.",
        metric: "F1 = 0.35–0.41 Realistic Range",
      },
      {
        title: "Precision is the shared bottleneck across all 7 classifiers",
        desc: "While models achieve recall up to 72.9% (AdaBoost), precision peaks at 34.6% (Logistic Regression). High false-positive rates mean customer intervention programs must be cost-calibrated to avoid over-subsidizing safe users.",
        metric: "Precision Peak: 34.6%",
      },
      {
        title: "SHAP Explainability Insights",
        desc: "SHAP summary plots on the best CatBoost model highlight that higher months in service, equipment upgrades, and customer service call frequencies display strong non-linear churn inflection points.",
        metric: "Non-linear Call Thresholds",
      },
    ],
    architecture: {
      description: "Python data science pipeline built with scikit-learn, CatBoost, XGBoost, imbalanced-learn (SMOTE), and SHAP.",
      sheetLayout: [
        { sheet: "01_data_cleaning_and_eda.ipynb", focus: "Pre-split 80/20 partitioning, train-only outlier capping, KNN imputation, feature encoding" },
        { sheet: "02_model_training_and_evaluation.ipynb", focus: "5-fold stratified CV, in-fold SMOTE, ablation across 8 feature sets, 7 baseline models, SHAP" },
        { sheet: "report/Churn_Prediction_Report.pdf", focus: "Full academic report in IEEE format with literature audit, ablation tables, and citations" },
      ],
      codeSnippet: `# Leakage-Safe Pipeline: Stratified Split BEFORE Any Transformation
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42
)

# In-Fold SMOTE inside Stratified 5-Fold Cross Validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for fold, (train_idx, val_idx) in enumerate(cv.split(X_train, y_train)):
    X_tr, y_tr = X_train.iloc[train_idx], y_train.iloc[train_idx]
    X_va, y_va = X_train.iloc[val_idx], y_train.iloc[val_idx]
    
    # Resampling applied STRICTLY on training fold
    smote = SMOTE(random_state=42)
    X_tr_res, y_tr_res = smote.fit_resample(X_tr, y_tr)
    model.fit(X_tr_res, y_tr_res)
    val_preds = model.predict(X_va)`,
      language: "Python (scikit-learn)",
    },
    recommendations: [
      { role: "Data Science Teams", text: "Always split data prior to imputation or SMOTE. Reporting validation metrics on pre-split resampled data invalidates test results." },
      { role: "Telecom Operations", text: "Use threshold-tuning to trade off recall against precision based on the marginal cost of a retention incentive vs customer lifetime value." },
    ],
    images: [],
    tags: ["Python", "scikit-learn", "Machine Learning", "EDA", "SHAP", "CatBoost", "XGBoost", "Data Leakage Audit"],
  },

  {
    id: "python-deepsense-v2v",
    category: "Python",
    categoryLabel: "Deep Learning & Conformal Risk Control",
    categoryBadgeColor: "var(--orange)",
    title: "DeepSenseV2V: Trajectory-Adaptive Power-Profile Conformal Beam Tracking",
    subtitle: "Multimodal Deep Learning (RGB + GPS) & Online Adaptive Conformal Inference (ACI) on 24,799 60 GHz V2V Samples",
    repoUrl: "https://github.com/moazzem-hossain-majumder/DeepSenseV2V",
    repoName: "DeepSenseV2V",
    highlightBadge: "24,799 Samples • 93% Search Reduction • Online Conformal Control • PyTorch",
    featured: true,
    overview:
      "A cutting-edge research project addressing the exhaustive beam training overhead in 256-beam 60 GHz Vehicle-to-Vehicle (V2V) mmWave links. Instead of scanning all 256 beams or predicting only a single beam, predicts the full future beam-power profile from temporal RGB+GPS observations and uses an online trajectory-adaptive risk controller (ACI/PID) to maintain a near-optimal-beam miss rate target with minimal probing overhead.",
    problemStatement:
      "In 60 GHz V2V mmWave communications, narrow directional beams are required to overcome high path loss. Exhaustively probing 256 beams creates massive latency and throughput overhead. Single-beam classification fails when vehicle vibrations or occlusions cause misalignment, with no statistical guarantee of coverage.",
    businessQuestions: [
      "Does full beam-power-profile supervision improve beam selection quality over classification-only models?",
      "Does online risk adaptation achieve target miss rates with fewer probes than static conformal thresholds?",
      "How much does multimodal RGB camera fusion improve utility compared to GPS-only prediction?",
    ],
    dataset: {
      name: "DeepSense 6G Multi-Modal V2V Beam Prediction (Scenario 36)",
      scale: "24,799 synchronized samples across 19 trajectory blocks in Arizona (Tempe/Phoenix/Chandler)",
      sources: "DeepSense 6G Consortium (deepsense6g.net)",
      cleaningNotes: "Chronological trajectory-block splitting (55/15/15/15) prevents temporal leakage. Cached 9-dim scaled GPS features and 686 MB in-memory RGB frames.",
    },
    kpis: [
      { label: "Multimodal Dataset", value: "24,799 Samples", note: "Synchronized camera frames + GPS", color: "var(--blue)" },
      { label: "Probing Overhead Reduction", value: "93% Cut", note: "17 average probes vs 256 standard beams", color: "var(--green)" },
      { label: "Guaranteed Miss Rate", value: "7.5% (Target 10%)", note: "Online ACI strictly satisfies α = 0.10", color: "var(--purple)" },
      { label: "Proposed Model Top-5", value: "46.79%", note: "Seed 42 P3 multi-task profile network", color: "var(--yellow)" },
      { label: "Profile MAE", value: "2.49 dB", note: "Beats 3.11 dB mean-profile floor", color: "var(--pink)" },
      { label: "Multimodal Fusion Gain", value: "+6.88 dB", note: "RGB+GPS cuts power loss from 14.17 to 7.29 dB", color: "var(--orange)" },
    ],
    findings: [
      {
        title: "Online Adaptive Conformal Inference (ACI) achieves 93% Search Reduction",
        desc: "ACI meets the 10% miss-rate target at only 17 average probes vs static CRC's 32 probes (47% further reduction) and baseline 256 beams, while holding empirical miss rate at 7.5%.",
        metric: "17 Probes vs 256 (93% Cut)",
      },
      {
        title: "Multimodal RGB+GPS dramatically beats GPS-only",
        desc: "Adding front-camera RGB frames to GPS reduces Average Power Loss (APL) by 6.88 dB (7.29 dB for RGB+GPS vs 14.17 dB for GPS-only), proving that visual obstruction awareness is critical.",
        metric: "6.88 dB APL Improvement",
      },
      {
        title: "Proposed Multi-Task Profile Model (P3) statistically outscores baselines",
        desc: "P3 profile MAE (2.49 dB) beats the mean-profile floor (3.11 dB). Paired trajectory-block bootstrap confirms P3 statistically outperforms classification-only Transformer (+6.31% Top-1, 95% CI: [+1.38%, +8.21%]).",
        metric: "+6.31% Statistically Significant Lift",
      },
    ],
    architecture: {
      description: "PyTorch multimodal architecture fusing ResNet-18 (RGB) + BiGRU (GPS) through Pre-LN Transformers, evaluated under Gibbs-Candès Adaptive Conformal Inference.",
      sheetLayout: [
        { sheet: "src/models.py", focus: "8 model backbones: B0 geometric, B1 GPS BiGRU, B3 Gated Concat, P1-P3 Transformers" },
        { sheet: "src/online_controller.py", focus: "Adaptive Conformal Inference (ACI) integral controller & Conformal PID" },
        { sheet: "eda_and_results.ipynb", focus: "Comprehensive 68-cell notebook covering data analysis, trajectories, and model comparisons" },
      ],
      codeSnippet: `# Online Adaptive Conformal Inference (ACI, Gibbs & Candès 2021)
# q_{t+1} = clip(q_t + η * (loss_t - α), q_min, q_max)
class AdaptiveConformalController:
    def __init__(self, alpha=0.10, eta=0.01, q_min=0.0, q_max=1.0):
        self.alpha = alpha
        self.eta = eta
        self.q = 0.5
        self.q_min = q_min
        self.q_max = q_max

    def step(self, loss_t):
        # Update threshold sequentially in real-time
        self.q = np.clip(self.q + self.eta * (loss_t - self.alpha), self.q_min, self.q_max)
        return self.q`,
      language: "Python (PyTorch)",
    },
    recommendations: [
      { role: "Network Architects", text: "Deploy trajectory-adaptive conformal controllers to reduce mmWave beam training latency by 93% without violating miss-rate safety thresholds." },
      { role: "Autonomous Systems", text: "Pair visual perception with vehicle telemetry for reliable 5G/6G V2V links under dynamic urban traffic occlusions." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/DeepSenseV2V/master/results/reliability_curves.png",
        caption: "Reliability Curves: Rolling miss rate comparing Adaptive Conformal Inference (ACI) and Conformal PID against the 10% miss rate safety target.",
        alt: "ACI vs PID Reliability Curves",
      },
    ],
    tags: ["Python", "PyTorch", "Deep Learning", "Conformal Prediction", "Computer Vision", "Multimodal Fusion", "Telecommunications"],
  },

  // =========================================================================
  // 4. POWER BI BUSINESS INTELLIGENCE
  // =========================================================================
  {
    id: "powerbi-telecom-churn",
    category: "Power BI",
    categoryLabel: "Power BI & DAX Analytics",
    categoryBadgeColor: "var(--yellow)",
    title: "Telecom Customer Churn & Retention Analytics Dashboard",
    subtitle: "Interactive Power BI Business Intelligence Dashboard, DAX Calculated Measures, Matrix Heatmaps & Risk Tiering",
    repoUrl: "https://github.com/moazzem-hossain-majumder/Telecom-Customer-Churn-Analytics",
    repoName: "Telecom-Customer-Churn-Analytics",
    highlightBadge: "Power BI • DAX Measures • Division Heatmap • Risk Tiering",
    featured: true,
    overview:
      "An interactive Power BI dashboard analyzing customer churn, service friction, and recharge revenue loss for a telecom operator across Bangladesh, built on a synthetic dataset of 5,000 customers. Features dynamic cross-filtering, 5 KPI scorecards, a division-by-tenure matrix heatmap, complaint-band distributions, and customer risk segmentation with in-cell data bars.",
    problemStatement:
      "Telecom leadership requires real-time visibility into geographic and tenure-based subscriber churn to deploy targeted regional retention offers before revenue leaks compound. Static spreadsheets fail to provide synchronized multi-slicer filtering or automated risk prioritization.",
    businessQuestions: [
      "Which administrative divisions and tenure bands suffer the highest customer churn?",
      "How do network issue complaints and customer service calls correlate with churn probability?",
      "Does mobile self-care app usage reduce customer churn rates?",
      "How much monthly recharge revenue has been lost, and how much is currently at risk among active retained customers?",
    ],
    dataset: {
      name: "Bangladesh Telecom Customer Churn Dataset",
      scale: "5,000 customer profiles across 8 administrative divisions and 10 operational columns",
      sources: "Synthetically generated logistic model (Python pandas/NumPy)",
      cleaningNotes: "Features: Customer_ID, Division, Connection_Type, Tenure_Months, Monthly_Recharge_BDT, App_User, Internet_Package, Customer_Service_Calls, Network_Issue_Complaints, Churn_Status.",
    },
    kpis: [
      { label: "Overall Churn Rate", value: "20.3%", note: "1,015 churned out of 5,000 customers", color: "var(--red)" },
      { label: "Monthly Revenue Lost", value: "BDT 451,760", note: "17.7% of total monthly recharge volume", color: "var(--red)" },
      { label: "App Usage Retention Lift", value: "13.9% vs 25.5%", note: "Self-care app users churn at nearly half the rate", color: "var(--green)" },
      { label: "Network Complaint Spike", value: "42.2% Churn", note: "For customers logging >3 network complaints", color: "var(--pink)" },
      { label: "High-Risk Retained Exposure", value: "BDT 77,750", note: "168 active high-risk customers prioritized", color: "var(--yellow)" },
      { label: "Top Churn Division", value: "Barishal (26.9%)", note: "Highest division churn rate in portfolio", color: "var(--orange)" },
    ],
    findings: [
      {
        title: "Self-Care App Adoption is a primary retention lever",
        desc: "App users churn at 13.9% versus 25.5% for non-app users. Incentivizing digital app onboarding represents the most scalable self-service retention tactic.",
        metric: "13.9% vs 25.5% Churn",
      },
      {
        title: "Network complaints trigger rapid churn spikes",
        desc: "Customers logging more than 3 network complaints churn at 42.2%, proving that technical network dissatisfaction rapidly overrides brand loyalty.",
        metric: "42.2% Churn on >3 Complaints",
      },
      {
        title: "Geographic vulnerability concentrated in Barishal",
        desc: "Barishal division leads the entire portfolio with a 26.9% churn rate, followed by early-tenure drops across Khulna and Sylhet.",
        metric: "26.9% Barishal Churn",
      },
      {
        title: "Immediate intervention target: BDT 77,750 at risk",
        desc: "Risk segmentation flags 168 active retained customers in the High-Risk tier, currently generating BDT 77,750 monthly recharge that can be proactively defended.",
        metric: "168 Customers • BDT 77K Protected",
      },
    ],
    architecture: {
      description: "Production Power BI report (.pbix) engineered with custom DAX calculated measures and columns, JSON theme styling, and interactive slicer synchronization.",
      sheetLayout: [
        { sheet: "reports/Telecom_Churn.pbix", focus: "Full Power BI Desktop report with interactive cross-filtering visuals" },
        { sheet: "reports/theme.json", focus: "Custom corporate orange theme with coordinated palette and card styles" },
        { sheet: "dax/measures.dax", focus: "DAX measures for Churn Rate, Total Recharge, Recharge Lost, Retained ARPU" },
        { sheet: "dax/columns.dax", focus: "Calculated columns for Tenure Bands, Complaint Bands, and Customer Risk Tiers" },
      ],
      codeSnippet: `-- DAX Measure: Churn Rate with Dynamic Filter Context
Churn Rate = 
DIVIDE(
    CALCULATE(COUNTROWS('Telecom_Churn'), 'Telecom_Churn'[Churn_Status] = 1),
    COUNTROWS('Telecom_Churn'),
    0
)

-- DAX Measure: Monthly Recharge Revenue Lost to Churn
Recharge Lost BDT = 
CALCULATE(
    SUM('Telecom_Churn'[Monthly_Recharge_BDT]),
    'Telecom_Churn'[Churn_Status] = 1
)

-- DAX Calculated Column: Risk Tier Segmentation
Risk_Tier = 
IF(
    'Telecom_Churn'[Churn_Status] = 0 && 
    'Telecom_Churn'[Network_Issue_Complaints] >= 3 && 
    'Telecom_Churn'[Customer_Service_Calls] >= 3,
    "High Risk",
    IF('Telecom_Churn'[Churn_Status] = 0 && 'Telecom_Churn'[Network_Issue_Complaints] >= 2, "Medium Risk", "Low Risk")
)`,
      language: "Power BI DAX",
    },
    recommendations: [
      { role: "Digital Product", text: "Promote in-app recharge bonuses to drive self-care app downloads, directly tapping the 13.9% low-churn behavior." },
      { role: "Network Operations", text: "Prioritize cell tower optimization in Barishal division to address root causes of the 26.9% regional churn rate." },
      { role: "Customer Care", text: "Trigger automatic proactive outreach when any customer logs their 3rd network complaint before churn occurs." },
    ],
    images: [
      {
        url: "https://raw.githubusercontent.com/moazzem-hossain-majumder/Telecom-Customer-Churn-Analytics/main/assets/dashboard.png",
        caption: "Interactive Power BI Dashboard: 5 KPI scorecards, division-by-tenure matrix heatmap, ranked division bar chart, complaint donut, and high-risk customer table with data bars.",
        alt: "Power BI Telecom Churn Dashboard",
      },
    ],
    tags: ["Power BI", "DAX", "Business Intelligence", "Dashboard Design", "Telecom Analytics", "Risk Segmentation", "Data Visualization"],
  },
];

// List of Data Analyst certifications (filtered strictly from data/profile.json)
export const DATA_ANALYST_CERTIFICATIONS = [
  {
    title: "IBM Data Analyst Professional Certificate",
    issuer: "IBM",
    year: "2026",
    credentialId: "H7HSE38VZ9IJ",
    link: "https://www.coursera.org/account/accomplishments/specialization/H7HSE38VZ9IJ",
    skills: ["Data Analysis", "Python", "SQL", "Excel", "Data Visualization", "Dashboards"],
    pinned: true,
  },
  {
    title: "IBM Data Analyst Capstone Project",
    issuer: "IBM",
    year: "2026",
    credentialId: "NTM8E43HJ0H5",
    link: "https://www.coursera.org/account/accomplishments/records/NTM8E43HJ0H5",
    skills: ["Data Analysis", "Python", "SQL", "Data Visualization", "Dashboards"],
    pinned: true,
  },
  {
    title: "CS50's Introduction to Programming with Python",
    issuer: "Harvard University",
    year: "2023",
    credentialId: "80971ce2-bab7-478b-b165-68c275f334cd",
    link: "https://certificates.cs50.io/80971ce2-bab7-478b-b165-68c275f334cd.pdf?size=letter",
    skills: ["Python", "OOP", "Algorithms", "Unit Testing"],
    pinned: true,
  },
  {
    title: "Excel Basics for Data Analysis",
    issuer: "IBM",
    year: "2026",
    credentialId: "8YLBDTDTLJCR",
    link: "https://www.coursera.org/account/accomplishments/records/8YLBDTDTLJCR",
    skills: ["Excel", "Data Analysis", "Spreadsheets", "Formulas"],
    pinned: false,
  },
  {
    title: "Data Visualization and Dashboards with Excel and Cognos",
    issuer: "IBM",
    year: "2026",
    credentialId: "CSTVSOQGOWDU",
    link: "https://www.coursera.org/account/accomplishments/records/CSTVSOQGOWDU",
    skills: ["Excel", "Cognos Analytics", "Dashboards", "Data Visualization"],
    pinned: false,
  },
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    year: "2026",
    credentialId: "36VP4VBS8RR8",
    link: "https://www.coursera.org/account/accomplishments/records/36VP4VBS8RR8",
    skills: ["SQL", "Databases", "Python", "Relational Databases"],
    pinned: false,
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM",
    year: "2026",
    credentialId: "MKH4PAM4SL3Y",
    link: "https://www.coursera.org/account/accomplishments/verify/MKH4PAM4SL3Y",
    skills: ["Data Analysis", "Pandas", "NumPy", "Data Wrangling"],
    pinned: false,
  },
  {
    title: "Data Visualization with Python",
    issuer: "IBM",
    year: "2026",
    credentialId: "ENN5C9II7PPP",
    link: "https://www.coursera.org/account/accomplishments/records/ENN5C9II7PPP",
    skills: ["Data Visualization", "Python", "Matplotlib", "Seaborn"],
    pinned: false,
  },
  {
    title: "Introduction to Data Analytics",
    issuer: "IBM",
    year: "2026",
    credentialId: "1GY694LIRWS3",
    link: "https://www.coursera.org/account/accomplishments/records/1GY694LIRWS3",
    skills: ["Data Analytics", "Data Visualization", "Data Mining"],
    pinned: false,
  },
  {
    title: "Python Project for Data Science",
    issuer: "IBM",
    year: "2026",
    credentialId: "6ACJ9INBUEEW",
    link: "https://www.coursera.org/account/accomplishments/records/6ACJ9INBUEEW",
    skills: ["Python", "Data Science", "Web Scraping", "Data Analysis"],
    pinned: false,
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    year: "2026",
    credentialId: "PQDW53B9YW2Y",
    link: "https://www.coursera.org/account/accomplishments/verify/PQDW53B9YW2Y",
    skills: ["Python", "Data Science", "APIs", "Data Structures"],
    pinned: false,
  },
  {
    title: "Introduction to Power BI",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "48,626,242",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/4eb8116f0f1c67cd47901f0c6ef198404c5a14c9?raw=1",
    skills: ["Power BI", "Data Visualization", "DAX", "Business Intelligence"],
    pinned: false,
  },
  {
    title: "Exploratory Data Analysis in Python",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "48,618,232",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/70e415276e933a7d8b855ead1bc42b88c79fac5f?raw=1",
    skills: ["EDA", "Python", "Pandas", "Statistical Analysis"],
    pinned: false,
  },
  {
    title: "Introduction to Statistics in Python",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "9f40dfece11465932a2b2c6b54639f1cd1c7e08e",
    link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9f40dfece11465932a2b2c6b54639f1cd1c7e08e",
    skills: ["Python", "Data Analysis", "Statistics", "Probability"],
    pinned: false,
  },
  {
    title: "Introduction to Data Science in Python",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "6f81a28e25fa66dfa8bb413a9667058b06cbe566",
    link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/6f81a28e25fa66dfa8bb413a9667058b06cbe566",
    skills: ["Python", "Pandas", "Data Wrangling"],
    pinned: false,
  },
  {
    title: "Time Series Analysis in Python",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "49,316,914",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/38a805abcfe77f728c762580ded53955eb84ec7d?raw=1",
    skills: ["Time Series Analysis", "Forecasting", "Trends"],
    pinned: false,
  },
  {
    title: "Introduction to PySpark",
    issuer: "DataCamp",
    year: "2026",
    credentialId: "49,567,426",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/fc27d3cc3967c642954bbde00da2cc600118a6b3?raw=1",
    skills: ["PySpark", "Apache Spark", "Big Data", "Distributed Computing"],
    pinned: false,
  },
  {
    title: "Deloitte Australia - Data Analytics Job Simulation",
    issuer: "Forage",
    year: "2026",
    credentialId: "FNrkPmStDF94S627q",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a1d2313b7f842cbd888f171_1780688358088_completion_certificate.pdf",
    skills: ["Data Analytics", "Data Visualization", "Forensic Analytics"],
    pinned: false,
  },
  {
    title: "BCG - Introduction to Data for Decision Makers Job Simulation",
    issuer: "Forage",
    year: "2026",
    credentialId: "SkJoBjhGM7BS4ekKP",
    link: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Pchc5rEGyCeozqY5Z_SKZxezskWgmFjRvj9_6a1d2313b7f842cbd888f171_1781039725389_completion_certificate.pdf",
    skills: ["Data Strategy", "Decision Making", "Business Insights"],
    pinned: false,
  },
  {
    title: "Tata - GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage",
    year: "2026",
    credentialId: "zqQbrsAEMtDM978zE",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_6a1d2313b7f842cbd888f171_1781078761159_completion_certificate.pdf",
    skills: ["Data Analytics", "Generative AI", "Predictive Analytics"],
    pinned: false,
  },
  {
    title: "Generative AI: Enhance your Data Analytics Career",
    issuer: "IBM",
    year: "2026",
    credentialId: "9ZCVSXA4OC4S",
    link: "https://www.coursera.org/account/accomplishments/records/9ZCVSXA4OC4S",
    skills: ["Generative AI", "Data Analysis", "Prompt Engineering", "Data Analytics"],
    pinned: false,
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    year: "2026",
    credentialId: "",
    link: "https://www.credly.com/badges/d39ae5b0-e539-4de4-8d6e-db31d45ec1ff/linked_in_profile",
    skills: ["Data Science", "Data Literacy", "Analytics"],
    pinned: false,
  },
];

