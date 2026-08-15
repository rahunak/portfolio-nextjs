import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Menu, X, AlertCircle, Send, Phone } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    id: "01",
    name: "RealStream",
    tagline: "AI-Native Media Orchestration Platform",
    description: "An event-driven ecosystem for generative AI video production. Architected the core orchestration layer to handle thousands of concurrent inference jobs with automated fault tolerance and job prioritization.",
    stack: ["NestJS", "BullMQ", "Redis", "Next.js", "AWS S3", "WebSockets"],
    year: "2026",
    image: "/src/sources/img/realstream-start-page.webp",
    blueprint: "/src/sources/img/realstrem-diagram-dark.svg"
  },
  {
    id: "02",
    name: "FinData Core",
    tagline: "High-Load Database Performance Engineering",
    description: "Massive analytical engine for fintech data. Optimized PostgreSQL workloads over 109M+ records, reducing critical query execution time from 1 hour to sub-5 seconds through advanced partitioning.",
    stack: ["PostgreSQL", "PHP 8", "Symfony", "React", "TypeScript"],
    year: "2025",
    image: "/src/sources/img/da_vinci.webp",
    blueprint: "/src/sources/img/da_vinci-diagram-dark.svg",
  },
  {
    id: "03",
    name: "UniGrid",
    tagline: "Multisite Architecture & Platform Modernization",
    description: "Orchestrated a massive multi-tenant infrastructure for Tel Aviv University, managing 200+ independent instances. Led the transition from legacy jQuery/CMS logic to a high-performance React-based architecture, improving delivery speed by 30%.",
    stack: ["Node.js", "React", "Docker", "PHP", "MySQL", "MongoDB"],
    year: "2024",
    image: "/src/sources/img/multisite_infra.webp"
  },
  {
    id: "04",
    name: "Storm - SalesFlow B2B",
    tagline: "Enterprise Workflow Automation Engine",
    description: "Custom dynamic workflow engine for large-scale sales teams. Reverse-engineered CRM internals to build non-standard data pipelines, reducing deployment-related failures by 70%.",
    stack: ["PHP", "SuiteCRM", "Docker", "React", "MySQL"],
    year: "2023",
    image: "/src/sources/img/salesflow_crm.webp"
  },
];

const skills = [
  { category: "Languages", items: ["TypeScript", "PHP", "JavaScript"] },
  { category: "Frontend", items: ["React", "Next.js", "Vue"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Symfony"] },
  { category: "Infrastructure", items: ["AWS", "Azure", "Docker", "Kubernetes"] },
  { category: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "MariaDB"] },
  { category: "Tooling", items: ["Git", "CI/CD", "Figma", "Grafana"] },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "PixelPlex",
    period: "2025",
    description: "Architected an event-driven AI media platform from scratch, launching a production-ready MVP in just 2 months using NestJS and BullMQ.",
  },
  {
    role: "Software Engineer",
    company: "Syberry",
    period: "2024 — 2025",
    description: "Optimized high-load PostgreSQL systems (109M+ records) from 1-hour queries to sub-5 seconds while modernizing legacy enterprise platforms with PHP 8.",
  },
  {
    role: "Fullstack Engineer",
    company: "Linnovate",
    period: "2021 — 2024",
    description: "Managed complex multisite infrastructure across 216+ databases and spearheaded a full-stack modernization from legacy jQuery to React/Node.js.",
  },
];

type FormData = { name: string; email: string; message: string };
type FormErrors = Partial<FormData>;

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const navLinks = ["work", "skills", "about", "contact"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">

      {/* ─── Navigation ─────────────────────────────────────────── */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : ""
          }`}
      >
        <button
          onClick={() => { scrollTo("home"); setMenuOpen(false); }}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          ZE — 2026
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10">
          {navLinks.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:zaiko.eugene@gmail.com"
            className="hidden md:flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase bg-accent text-accent-foreground px-4 py-2 hover:opacity-90 active:opacity-75 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Hire me <ArrowUpRight size={12} strokeWidth={2.5} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-foreground p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-center px-6 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav aria-label="Mobile navigation" className="space-y-2">
          {navLinks.map((s) => (
            <button
              key={s}
              onClick={() => { scrollTo(s); setMenuOpen(false); }}
              tabIndex={menuOpen ? 0 : -1}
              className="block w-full text-left font-heading text-6xl font-bold capitalize text-foreground hover:text-accent active:opacity-70 transition-colors duration-150 py-2 focus-visible:outline-none focus-visible:text-accent"
            >
              {s}
            </button>
          ))}
        </nav>
        <div className="mt-14 pt-8 border-t border-border space-y-3">
          <a
            href="mailto:zaiko.eugene@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={12} /> zaiko.eugene@gmail.com
          </a>
          <a
            href="https://github.com/rahunak"
            tabIndex={menuOpen ? 0 : -1}
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={12} /> GitHub
          </a>
        </div>
      </div>

      <main id="main-content">

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section
          id="home"
          aria-label="Introduction"
          className="min-h-screen flex flex-col justify-between pt-24 pb-14 px-6 md:px-12 scroll-mt-20"
        >
          <div className="grid md:grid-cols-2 gap-6 items-start mt-10 md:mt-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6 md:mb-10">
                Full-Stack Engineer · Belarus
              </p>
              <h1
                className="font-heading font-bold leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
              >
                Eugene
                <br />
                Zaiko
              </h1>
            </div>
            <div className="flex flex-col justify-end md:pt-36 max-w-md">
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                I build fast, thoughtful software — from developer tools and APIs
                to products used by millions. I care deeply about performance,
                accessibility, and craft.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <button
                  onClick={() => scrollTo("work")}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3 hover:bg-foreground hover:text-background active:opacity-75 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  View work
                </button>
                <a
                  href="https://github.com/rahunak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between mt-auto pt-16">
            <div className="flex gap-8 md:gap-16 flex-wrap">
              {[
                { label: "Experience", value: "5+ yrs" },
                { label: "Projects", value: "20+" },
                { label: "Location", value: "Belarus" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    {label}
                  </p>
                  <p className="font-heading text-2xl md:text-3xl font-light italic">{value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("work")}
              aria-label="Scroll to work section"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ArrowDown size={20} className="animate-bounce" />
            </button>
          </div>
        </section>

        <div className="border-t border-border mx-6 md:mx-12" />

        {/* ─── Work ─────────────────────────────────────────────── */}
        <section
          id="work"
          aria-label="Selected projects"
          className="px-6 md:px-12 py-20 md:py-28 scroll-mt-20"
        >
          <div className="flex items-baseline justify-between mb-14">
            <h2
              className="font-heading font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Selected work
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block" aria-hidden="true">
              01 — Projects
            </p>
          </div>

          <div className="border-t border-border" role="list" aria-label="Project list">
            {projects.map((p) => (
              <div
                key={p.id}
                role="listitem"
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group border-b border-border py-7 grid grid-cols-[40px_1fr_auto] md:grid-cols-[56px_1fr_auto_auto] gap-4 md:gap-8 items-center cursor-pointer transition-all duration-200 hover:pl-3 focus-within:pl-3"
              >
                <span className="font-mono text-[10px] text-muted-foreground tracking-[0.15em]" aria-hidden="true">
                  {p.id}
                </span>
                <div>
                  <h3
                    className="font-heading text-2xl md:text-4xl font-bold transition-colors duration-150"
                    style={{ color: hoveredProject === p.id ? "#c8ff4b" : undefined }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                </div>
                <div className="hidden md:flex flex-wrap gap-2 max-w-xs" aria-label="Technologies">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-1 tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground">{p.year}</span>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors duration-150" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {projects.slice(0, 2).map((p) => (
              <div
                key={p.id}
                className="relative aspect-video bg-card overflow-hidden group cursor-pointer border border-border/50"
              >
                {/* Layer 1: Blueprint (Bottom) */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1, scale: 0.95 }}
                  whileHover={{ opacity: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={p.blueprint}
                    alt={`${p.name} architecture diagram`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                </motion.div>

                {/* Layer 2: Cover Image (Top) */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  whileHover={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.tagline}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Gradient overlay (always visible) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                {/* Content: Title + Year (always visible) */}
                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50 mb-2">
                    {p.tagline} — {p.year}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                    {p.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border mx-6 md:mx-12" />

        {/* ─── Skills ───────────────────────────────────────────── */}
        <section
          id="skills"
          aria-label="Technical skills"
          className="px-6 md:px-12 py-20 md:py-28 scroll-mt-20"
        >
          <div className="flex items-baseline justify-between mb-14">
            <h2
              className="font-heading font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Skills
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block" aria-hidden="true">
              02 — Stack
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3" role="list" aria-label="Skill categories">
            {skills.map((group) => (
              <div
                key={group.category}
                role="listitem"
                className="border border-border p-5 md:p-6 -mt-px -ml-px hover:bg-card transition-colors duration-150"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
                  {group.category}
                </p>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-heading text-lg md:text-xl font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border mx-6 md:mx-12" />

        {/* ─── About ────────────────────────────────────────────── */}
        <section
          id="about"
          aria-label="About me"
          className="px-6 md:px-12 py-20 md:py-28 scroll-mt-20"
        >
          <div className="flex items-baseline justify-between mb-14">
            <h2
              className="font-heading font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              About
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block" aria-hidden="true">
              03 — Profile
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-12 md:gap-20 items-start">
            <div>
              <div className="space-y-5 mb-14">
                <p className="text-xl leading-relaxed text-muted-foreground">
                  {"I build systems that stay fast at scale and ship on time."}
                </p>

                <p className="text-xl leading-relaxed text-muted-foreground">
                  {
                    "Over 5+ years at PixelPlex, Syberry, and Linnovate, I've owned architecture at scale: 216 isolated databases, 109M+ records queried in under 5 seconds, and a production LLM media-processing engine shipped in 60 days."
                  }
                </p>

                <p className="text-xl leading-relaxed text-muted-foreground">
                  {
                    "I work across Node.js / TypeScript, PHP / Symfony, and React — with a focus on clean boundaries, measurable performance, and AI features that are safe to run in production."
                  }
                </p>
              </div>

              <ol aria-label="Work experience" className="border-t border-border">
                {experience.map((job, i) => (
                  <li key={i} className="grid md:grid-cols-[180px_1fr] gap-4 py-7 border-b border-border">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                        {job.period}
                      </p>
                      <p className="font-mono text-[11px] text-accent mt-1.5 tracking-wide">
                        {job.company}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{job.role}</p>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{job.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] bg-card overflow-hidden">
                <img
                  src="/src/sources/img/avatar.webp"
                  alt="Portrait photo of Eugene Zaiko"
                  className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <div aria-label="Currently open to work" className="absolute -bottom-3 -right-3 w-20 h-20 bg-accent flex items-center justify-center">
                <p className="font-mono text-[9px] text-accent-foreground text-center leading-snug tracking-widest uppercase font-medium">
                  Open<br />to<br />work
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-border mx-6 md:mx-12" />

        {/* ─── Contact ──────────────────────────────────────────── */}
        <section
          id="contact"
          aria-label="Contact"
          className="px-6 md:px-12 py-20 md:py-28 scroll-mt-20"
        >
          <div className="flex items-baseline justify-between mb-14">
            <h2
              className="font-heading font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              {"Let's talk"}
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block" aria-hidden="true">
              04 — Contact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-xl leading-relaxed text-muted-foreground mb-10">
                Currently available for freelance projects and full-time roles. Reach out directly or use the form.
              </p>
              <div className="space-y-5">
                <a
                  href="mailto:zaiko.eugene@gmail.com"
                  className="flex items-center gap-2 text-lg group hover:text-muted-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Mail size={16} aria-hidden="true" />
                  zaiko.eugene@gmail.com
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                </a>
                <a
                  href="tel:+375257810998"
                  className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  <Phone size={16} aria-hidden="true" />
                  +375257810998
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/eugene-zaiko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Linkedin size={13} aria-hidden="true" /> LinkedIn
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/rahunak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Github size={13} aria-hidden="true" /> GitHub
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                </a>
                <a
                  href="https://t.me/rahunak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-150 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Send size={13} aria-hidden="true" /> Telegram
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                </a>

              </div>
            </div>

            <form onSubmit={handleSubmit} aria-label="Contact form" noValidate className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  aria-invalid={!!errors.name}
                  placeholder="Your name"
                  className={`w-full bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors duration-200 text-sm border ${errors.name ? "border-destructive" : "border-border focus:border-foreground/60"
                    }`}
                />
                {errors.name && (
                  <p id="error-name" role="alert" className="flex items-center gap-1.5 font-mono text-[10px] text-destructive mt-2">
                    <AlertCircle size={10} aria-hidden="true" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  aria-invalid={!!errors.email}
                  placeholder="your@email.com"
                  className={`w-full bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors duration-200 text-sm border ${errors.email ? "border-destructive" : "border-border focus:border-foreground/60"
                    }`}
                />
                {errors.email && (
                  <p id="error-email" role="alert" className="flex items-center gap-1.5 font-mono text-[10px] text-destructive mt-2">
                    <AlertCircle size={10} aria-hidden="true" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  aria-invalid={!!errors.message}
                  placeholder="Tell me about your project..."
                  className={`w-full bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors duration-200 resize-none text-sm border ${errors.message ? "border-destructive" : "border-border focus:border-foreground/60"
                    }`}
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="flex items-center gap-1.5 font-mono text-[10px] text-destructive mt-2">
                    <AlertCircle size={10} aria-hidden="true" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full font-mono text-[11px] tracking-[0.2em] uppercase py-4 bg-accent text-accent-foreground hover:opacity-90 active:opacity-75 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sent ? "Message sent ✓" : "Send message"}
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer role="contentinfo" className="border-t border-border px-6 md:px-12 py-7 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          © 2026 Eugene Zaiko
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          Belarus
        </p>
      </footer>
    </div>
  );
}
