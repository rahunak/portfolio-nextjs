export interface CaseStat {
  value: string;
  label: string;
}

export interface ApproachStep {
  heading: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  company: string;
  role: string;
  image: string;
  imageAlt: string;
  /** SEO title tag, ~50-60 chars */
  title: string;
  description: string;
  keywords: string[];
  /** 40-60 word answer block, extractable on its own */
  summary: string;
  problem: string[];
  approach: ApproachStep[];
  outcomes: CaseStat[];
  stack: string[];
}

const AUTHOR_DESCRIPTION =
  "Eugene Zaiko is a senior full-stack engineer (5+ years, ex-PixelPlex, Syberry, Linnovate) specializing in event-driven backends, PostgreSQL at scale, and production AI systems.";

export const AUTHOR = {
  name: "Eugene Zaiko",
  url: "https://safesync.dev",
  jobTitle: "Senior Full-Stack Engineer",
  description: AUTHOR_DESCRIPTION,
  sameAs: [
    "https://github.com/rahunak",
    "https://www.linkedin.com/in/eugene-zaiko",
    "https://t.me/rahunak",
  ],
  email: "mailto:zaiko.eugene@gmail.com",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "realstream",
    name: "RealStream",
    tagline: "AI-Native Media Orchestration",
    year: "2026",
    company: "PixelPlex",
    role: "Architecture & lead implementation",
    image: "/realstream-start-page.webp",
    imageAlt:
      "RealStream start page — event-driven AI media orchestration platform",
    title: "RealStream: Event-Driven AI Media Platform (NestJS, BullMQ)",
    description:
      "How RealStream orchestrates thousands of concurrent AI inference jobs: queue-based prioritization, automatic fault tolerance, WebSocket status tracking. Production MVP shipped in 60 days.",
    keywords: [
      "NestJS architecture",
      "BullMQ queues",
      "event-driven platform",
      "AI media pipeline",
    ],
    summary:
      "RealStream orchestrates generative AI video workloads. I designed an event-driven NestJS and BullMQ service architecture that schedules thousands of concurrent inference jobs, survives provider failures automatically, and streams job status to users over WebSockets. The production MVP shipped in 60 days.",
    problem: [
      "A generative-media pipeline is hostile to naive engineering. Single inference calls run anywhere from seconds to tens of minutes, upstream model providers fail mid-flight, and users expect an accurate status for every job they submit.",
      "Synchronous request handlers collapse under this profile, and unbounded background loops lose jobs or bury the ones that matter. The platform needed an orchestration layer that treats each job as a queue item with a defined lifecycle, priority, and failure contract.",
    ],
    approach: [
      {
        heading: "Queues carry the job lifecycle",
        body:
          "Every submission becomes a BullMQ job with a priority, a timeout, and a retry policy. The NestJS services stay small: each owns a stage of the pipeline instead of one bloated monolith that knows everything.",
      },
      {
        heading: "Priority lanes for interactive load",
        body:
          "Interactive requests can sit behind batch work without users noticing. Queue-based prioritization lets short, user-facing jobs overtake long-running batch renders while keeping throughput predictable.",
      },
      {
        heading: "Fault tolerance as a default, not a feature",
        body:
          "Providers fail mid-flight, so every stage assumes it. Timeouts, capped exponential backoff retries, and stale-artifact cleanup keep the pipeline converging instead of leaking half-finished jobs.",
      },
      {
        heading: "Status streamed over WebSockets",
        body:
          "Job stage transitions publish through Redis and the WebSocket gateway reaches every subscribed client in real time. Nobody watches a spinner while a render queues behind a thousand others.",
      },
      {
        heading: "Artifacts live in object storage",
        body:
          "Intermediate and final media land in AWS S3 while the processing services stay stateless. Any worker can die and be replaced; the pipeline keeps moving.",
      },
    ],
    outcomes: [
      { value: "60 days", label: "From concept to production MVP" },
      { value: "1,000s", label: "Concurrent inference jobs orchestrated" },
      { value: "Real-time", label: "Job status for every submission via WebSockets" },
    ],
    stack: ["NestJS", "BullMQ", "Redis", "Next.js", "AWS S3", "WebSockets"],
  },
  {
    slug: "perseus",
    name: "Perseus",
    tagline: "109M+ Records. 720x Faster.",
    year: "2025",
    company: "Syberry",
    role: "PostgreSQL performance & data architecture",
    image: "/da_vinci.webp",
    imageAlt:
      "Perseus industrial IoT telemetry dashboards on water treatment data",
    title: "PostgreSQL Partitioning at 109M Rows: 1 Hour to <5 Seconds",
    description:
      "A hardware-aware PostgreSQL partitioning strategy for industrial telemetry: 109M+ records, critical queries cut from 1 hour to under 5 seconds. Data architecture for Perseus, explained.",
    keywords: [
      "PostgreSQL partitioning",
      "IoT telemetry",
      "query optimization",
      "large tables",
    ],
    summary:
      "Perseus is industrial IoT analytics for water treatment telemetry. A hardware-aware PostgreSQL partitioning strategy cut critical queries from 1 hour to under 5 seconds across 109M+ records by sending enterprise-tier clients with expensive monitoring devices to dedicated partitions.",
    problem: [
      "The system ingests continuous telemetry from water treatment facilities. More than a hundred million rows accumulate across the device fleet, and the nightly critical reports aggregate over most of it. A single important query took about an hour to complete.",
      "Adding indexes and more replicas was no longer a strategy. The table needed a physical layout that matched how the business actually reads the data.",
    ],
    approach: [
      {
        heading: "Profile reading patterns before touching schema",
        body:
          "Users rarely query the fleet as one blob. Enterprise-tier clients with many high-value monitoring devices read their own history; operational staff scan recent windows. The access profile defined the partition key.",
      },
      {
        heading: "Hardware-aware partitioning",
        body:
          "Partitioning was designed around the monitoring hardware tiers: enterprise-grade devices with expensive sensors went to dedicated partitions. Partition pruning then excludes the rest of the fleet for those queries automatically.",
      },
      {
        heading: "Land the change without an outage window",
        body:
          "The migration ran on PHP 8 / Symfony services so it could execute incrementally while the old table kept serving reads, then queries were flipped to the partitioned tables once validated.",
      },
      {
        heading: "Dashboards verify the win",
        body:
          "React and TypeScript dashboards on top meant the improvement was visible to non-engineers immediately, not just in EXPLAIN plans.",
      },
    ],
    outcomes: [
      { value: "109M+", label: "Records queried in under 5 seconds" },
      { value: "720x", label: "Faster critical query path" },
      { value: "1h → <5s", label: "Nightly critical reporting runtime" },
    ],
    stack: ["PostgreSQL", "PHP 8", "Symfony", "React", "TypeScript"],
  },
  {
    slug: "experts-and-partners",
    name: "Experts & Partners",
    tagline: "216+ Databases. Zero Downtime.",
    year: "2024",
    company: "Linnovate",
    role: "Infrastructure management & full-stack modernization",
    image: "/multisite_infra.webp",
    imageAlt:
      "Multi-tenant infrastructure diagram for the Experts & Partners platform",
    title: "216 Tenant Databases, Zero-Downtime Legacy Modernization",
    description:
      "Running 216+ isolated tenant databases for a university platform and migrating it from legacy jQuery and CMS to React and Node.js — with zero downtime and 30% higher development throughput.",
    keywords: [
      "multi-tenant architecture",
      "database modernization",
      "legacy migration",
      "Node.js",
    ],
    summary:
      "For Tel Aviv University's Experts & Partners platform I managed 216+ isolated tenant databases and led a migration from legacy jQuery and CMS to a React and Node.js stack. Development throughput rose 30%, and the migration ran with zero downtime across tenants.",
    problem: [
      "The platform serves university partners and experts across strict access boundaries: every tenant holds its own isolated database. At 216+ databases, any change that touched the shared code had to be safe for all of them at once.",
      "The legacy jQuery-and-CMS stack made even small features slow to ship and risky to deploy. Modernization had to happen while the platform stayed live and tenant data stayed isolated.",
    ],
    approach: [
      {
        heading: "Isolation is the product requirement",
        body:
          "Each tenant keeps an independent database. Infrastructure and migrations are scripted so they can run across hundreds of databases repeatedly and idempotently, never interactively per tenant.",
      },
      {
        heading: "Modernize the stack, not everything at once",
        body:
          "New features moved to React and Node.js while legacy screens kept running. The migration path skipped the big-bang rewrite and its downtime risk entirely.",
      },
      {
        heading: "Containerize what ships",
        body:
          "Docker packaging and MongoDB for the orchestration services made deployments reproducible across environments — the only way to operate hundreds of tenant databases with a small team.",
      },
    ],
    outcomes: [
      { value: "216+", label: "Isolated tenant databases managed" },
      { value: "+30%", label: "Development throughput after modernization" },
      { value: "0", label: "Downtime minutes during the migration"},
    ],
    stack: ["PHP", "Express.js", "React", "Docker", "MongoDB"],
  },
  {
    slug: "storm",
    name: "Storm",
    tagline: "Auto Resale with Buy-Back Guarantee",
    year: "2023",
    company: "Linnovate",
    role: "Full-stack development & deployment",
    image: "/salesflow_crm.webp",
    imageAlt:
      "Storm automotive resale platform built around a buy-back guarantee",
    title: "Storm: B2C Auto Resale on a Reverse-Engineered Legacy CRM",
    description:
      "Rebuilding a B2C automotive resale platform with a guaranteed buy-back: legacy CRM reverse-engineered into dynamic workflows, third-party integrations shipped, deployment failures cut 70% with Docker.",
    keywords: [
      "legacy modernization",
      "workflow automation",
      "Docker deployment",
      "B2C platform",
    ],
    summary:
      "Storm is a B2C automotive resale platform with a guaranteed vehicle buy-back. I reverse-engineered the internals of a legacy CRM, rebuilt dynamic workflows around it, integrated third-party services, and containerized deployments with Docker, cutting deployment failures by 70%.",
    problem: [
      "A buy-back guarantee is not a landing page feature. It is a legally binding workflow the product inherits from an old, undocumented CRM. Every vehicle resale has to execute that workflow correctly, from listing to guaranteed repurchase.",
      "The legacy CRM had no API surface and no documentation. Deploys failed unpredictably, which is tolerable for internal tooling but fatal for a consumer platform promising guarantees.",
    ],
    approach: [
      {
        heading: "Reverse-engineer what cannot be replaced yet",
        body:
          "I mapped the legacy CRM's internals into explicit, dynamic workflows the new platform can drive. The behavior the business relies on stayed intact while the interface around it modernized.",
      },
      {
        heading: "Integrate the third-party services properly",
        body:
          "Payments, vehicle data, and operations systems were wired through defined integration layers instead of scattered ad-hoc calls, so a failing external service could not take down the whole flow.",
      },
      {
        heading: "Make deployments boring with Docker",
        body:
          "Containerizing the PHP and React stack removed environment drift. Deploys became a routine operation instead of a risk event.",
      },
    ],
    outcomes: [
      { value: "-70%", label: "Deployment failures after containerization" },
      { value: "Legacy", label: "CRM internals reverse-engineered into dynamic workflows" },
      { value: "Live", label: "Third-party integrations running across operations"},
    ],
    stack: ["PHP", "React", "Docker", "MySQL"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const caseStudyUrls = caseStudies.map(
  (c) => `https://safesync.dev/work/${c.slug}`
);
