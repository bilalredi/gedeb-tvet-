import React, { useEffect, useRef, useState } from "react";
import {
  Menu, X, ArrowRight, ArrowUpRight, Monitor, Zap, HardHat, Car, Hotel,
  Sprout, Scissors, Briefcase, Cog, Users, GraduationCap, Award,
  Building2, BookOpen, Presentation, Handshake, Compass, BadgePercent,
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Quote,
  Calendar, Send, FileText, Upload, ClipboardCheck, TreePine, Lightbulb,
  ChevronLeft, ChevronRight as ChevronRightIcon, CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------------------
   DESIGN TOKENS
   Palette  : Deep workshop blue #16324F, signal green #1E8E6B,
              plate white #F6F4EE, ink #16211D, hazard amber #E2A63B
   Type     : Space Grotesk (display) / Inter (body) / IBM Plex Mono (spec/labels)
   Signature: "Equipment tag" cards — bracketed corners + mono spec code,
              like the ID plates riveted to workshop machinery.
--------------------------------------------------------------------- */

const FONT_IMPORT_ID = "gedeb-fonts";

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Bracketed "equipment tag" frame — the signature visual motif */
function TagFrame({ children, className = "", accent = "green" }) {
  const clr = accent === "amber" ? "var(--amber)" : accent === "blue" ? "var(--blue)" : "var(--green)";
  return (
    <div className={`tagframe ${className}`} style={{ "--tag-accent": clr }}>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#why", label: "Why Gedeb" },
  { href: "#admissions", label: "Admissions" },
  { href: "#facilities", label: "Campus" },
  { href: "#stories", label: "Stories" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

const PROGRAMS = [
  { code: "PRG–01", title: "Information Technology", icon: Monitor, desc: "Networking, software development and IT support skills built on real lab equipment and live-fault troubleshooting." },
  { code: "PRG–02", title: "Electrical Installation", icon: Zap, desc: "Wiring, circuit design and safety-first installation practice, from single homes to industrial panels." },
  { code: "PRG–03", title: "Building Construction", icon: HardHat, desc: "Masonry, surveying and structural fundamentals taught on active training sites, not just paper plans." },
  { code: "PRG–04", title: "Automotive Technology", icon: Car, desc: "Engine diagnostics, maintenance and repair across petrol, diesel and increasingly electric drivetrains." },
  { code: "PRG–05", title: "Hotel and Tourism", icon: Hotel, desc: "Front-office, culinary and guest-service training aligned with Ethiopia's growing hospitality sector." },
  { code: "PRG–06", title: "Agriculture", icon: Sprout, desc: "Modern agronomy, irrigation and post-harvest handling suited to Gedeb's farming economy." },
  { code: "PRG–07", title: "Fashion Design", icon: Scissors, desc: "Pattern-making, garment construction and small-business skills for independent designers." },
  { code: "PRG–08", title: "Business Management", icon: Briefcase, desc: "Bookkeeping, marketing and enterprise planning for future managers and entrepreneurs." },
  { code: "PRG–09", title: "Metal & Manufacturing", icon: Cog, desc: "Welding, fabrication and machining on industrial-grade equipment in supervised workshop bays." },
];

const WHY_US = [
  { icon: GraduationCap, title: "Experienced instructors", desc: "Trainers with real industry backgrounds, not just classroom credentials." },
  { icon: HardHat, title: "Hands-on learning", desc: "Most hours are spent at a bench, a site, or a workstation — not a lecture hall." },
  { icon: Building2, title: "Modern workshops", desc: "Labs and workshops equipped and maintained to current occupational standards." },
  { icon: Handshake, title: "Industry partnerships", desc: "Employers help shape our curriculum and host our trainees for placement." },
  { icon: BadgePercent, title: "Affordable education", desc: "Quality technical training kept within reach of families across the region." },
  { icon: Briefcase, title: "Internship opportunities", desc: "Supervised placements that turn coursework into a working resume." },
  { icon: Compass, title: "Career guidance", desc: "Counseling support from enrollment through job placement." },
  { icon: Award, title: "Recognized certification", desc: "Nationally accredited credentials employers know and trust." },
];

const ADMISSION_STEPS = [
  { n: "01", icon: FileText, title: "Submit application", desc: "Complete the online or in-person application form for your chosen program." },
  { n: "02", icon: Upload, title: "Upload documents", desc: "Provide your academic records and identification for verification." },
  { n: "03", icon: ClipboardCheck, title: "Admission review", desc: "Our admissions team reviews your file and confirms your placement." },
  { n: "04", icon: GraduationCap, title: "Register & begin", desc: "Complete registration and start training on the scheduled intake date." },
];

const FACILITIES = [
  { icon: Monitor, title: "Computer Labs" },
  { icon: Cog, title: "Engineering Workshops" },
  { icon: BookOpen, title: "Library" },
  { icon: Presentation, title: "Smart Classrooms" },
  { icon: Users, title: "Student Services" },
  { icon: Lightbulb, title: "Innovation Center" },
  { icon: Building2, title: "Conference Hall" },
  { icon: TreePine, title: "Outdoor Training Areas" },
];

const STORIES = [
  { name: "Betelhem Alemu", program: "Information Technology, 2023", quote: "The IT workshop gave me real client-support cases to solve, not just theory. I now run a small computer-repair shop in Dilla." },
  { name: "Dawit Bekele", program: "Automotive Technology, 2022", quote: "Working on real engines every week is what got me hired at a garage before I even graduated." },
  { name: "Saron Girma", program: "Fashion Design, 2023", quote: "I left Gedeb with a portfolio, a client list, and the confidence to open my own tailoring workshop." },
];

const NEWS = [
  { date: "July 14, 2026", tag: "Announcement", title: "New Metal & Manufacturing bay opens for the 2026 intake", excerpt: "An expanded fabrication workshop adds welding and CNC stations for trainees this term." },
  { date: "June 30, 2026", tag: "Community", title: "Gedeb TVET hosts regional employer partnership day", excerpt: "Local businesses met graduating trainees for on-the-spot interviews and placement talks." },
  { date: "June 18, 2026", tag: "Graduation", title: "312 trainees graduate across nine programs", excerpt: "This year's cohort marks the college's largest graduating class to date." },
];

export default function GedebTVETLanding() {
  useFonts();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [storyIdx, setStoryIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextStory = () => setStoryIdx((i) => (i + 1) % STORIES.length);
  const prevStory = () => setStoryIdx((i) => (i - 1 + STORIES.length) % STORIES.length);

  return (
    <div className="gedeb-root">
      <style>{`
        .gedeb-root {
          --blue: #16324F;
          --blue-deep: #0E2338;
          --green: #1E8E6B;
          --green-soft: #E4F3EC;
          --amber: #E2A63B;
          --paper: #F6F4EE;
          --paper-dim: #EFEBE0;
          --ink: #16211D;
          --ink-soft: #4C5A54;
          font-family: 'Inter', sans-serif;
          background: var(--paper);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }
        .gedeb-root h1, .gedeb-root h2, .gedeb-root h3, .gedeb-root .display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .gedeb-root .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.04em; }

        .blueprint-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .plate {
          background: var(--blue-deep);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .tagframe {
          position: relative;
          border: 1px solid rgba(22,50,79,0.14);
          background: #fff;
        }
        .tagframe .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--tag-accent);
          border-style: solid;
          border-width: 0;
          opacity: 0.85;
          transition: width .35s ease, height .35s ease;
        }
        .tagframe .tl { top: -1px; left: -1px; border-top-width: 2.5px; border-left-width: 2.5px; }
        .tagframe .tr { top: -1px; right: -1px; border-top-width: 2.5px; border-right-width: 2.5px; }
        .tagframe .bl { bottom: -1px; left: -1px; border-bottom-width: 2.5px; border-left-width: 2.5px; }
        .tagframe .br { bottom: -1px; right: -1px; border-bottom-width: 2.5px; border-right-width: 2.5px; }
        .tagframe:hover .corner { width: 22px; height: 22px; }
        .tagframe:hover { transform: translateY(-4px); box-shadow: 0 18px 34px -18px rgba(22,50,79,0.35); }
        .tagframe { transition: transform .35s ease, box-shadow .35s ease; }

        .rivet {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          box-shadow: inset 0 1px 1px rgba(0,0,0,0.4);
        }

        .navlink { position: relative; }
        .navlink::after {
          content: '';
          position: absolute; left: 0; right: 0; bottom: -4px; height: 2px;
          background: var(--green);
          transform: scaleX(0); transform-origin: left;
          transition: transform .3s ease;
        }
        .navlink:hover::after { transform: scaleX(1); }

        .btn-primary {
          background: var(--green);
          color: #fff;
          transition: background .25s ease, transform .25s ease;
        }
        .btn-primary:hover { background: #176F53; transform: translateY(-2px); }

        .btn-outline {
          border: 1.5px solid rgba(255,255,255,0.55);
          color: #fff;
          transition: background .25s ease, transform .25s ease, border-color .25s ease;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }

        .btn-dark {
          border: 1.5px solid var(--blue);
          color: var(--blue);
          transition: background .25s ease, color .25s ease, transform .25s ease;
        }
        .btn-dark:hover { background: var(--blue); color: #fff; transform: translateY(-2px); }

        .gear-spin { animation: spin 26s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .marquee-track { animation: marquee 34s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .stat-tick { border-left: 1px dashed rgba(255,255,255,0.25); }
        .stat-tick:first-child { border-left: none; }

        @media (prefers-reduced-motion: reduce) {
          .gear-spin, .marquee-track { animation: none !important; }
          * { transition: none !important; }
        }

        html { scroll-behavior: smooth; }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(22,50,79,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(6px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center rounded-md"
              style={{ width: 34, height: 34, background: "var(--green)" }}
            >
              <Cog className="gear-spin" size={18} color="#fff" />
            </span>
            <span className="text-white leading-tight">
              <span className="block display font-semibold text-[15px] md:text-base">Gedeb TVET College</span>
              <span className="block mono text-[10px] tracking-widest opacity-70">DILLA · ETHIOPIA</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="navlink text-[13.5px] text-white/85 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn-outline text-[13px] font-medium px-4 py-2 rounded-md">Contact</a>
            <a href="#admissions" className="btn-primary text-[13px] font-semibold px-4 py-2 rounded-md">Apply Now</a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden plate px-5 pb-5 pt-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setNavOpen(false)}
                  className="text-white/85 hover:text-white text-sm py-2.5 border-b border-white/10"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#admissions" onClick={() => setNavOpen(false)} className="btn-primary block text-center text-sm font-semibold px-4 py-2.5 rounded-md mt-4">
              Apply Now
            </a>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="relative overflow-hidden plate blueprint-bg pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 20%, rgba(30,142,107,0.22), transparent 55%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 mono text-[11px] text-white/70 border border-white/20 rounded-full px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--amber)" }} />
                  TVET INSTITUTION · DILLA, ETHIOPIA
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display text-white font-semibold text-[2.4rem] leading-[1.08] md:text-6xl md:leading-[1.05]">
                  Empowering Skills,<br />Building Futures
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-white/75 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
                  Join Gedeb TVET College and gain practical knowledge, technical skills, and
                  industry-focused training that prepares you for successful careers and entrepreneurship.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 mt-9">
                  <a href="#admissions" className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-md">
                    Apply Now <ArrowRight size={16} />
                  </a>
                  <a href="#programs" className="btn-outline inline-flex items-center gap-2 font-medium text-sm px-6 py-3.5 rounded-md">
                    Explore Programs
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Signature: workshop "spec plate" panel replacing a stock photo */}
            <Reveal delay={200}>
              <div className="plate rounded-xl p-6 relative" style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.5)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="mono text-[10px] text-white/50">UNIT PLATE / 001</span>
                  <div className="flex gap-1.5">
                    <span className="rivet" /><span className="rivet" /><span className="rivet" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[Monitor, Zap, HardHat, Car, Cog, Sprout].map((Icon, i) => (
                    <div key={i} className="aspect-square rounded-md border border-white/10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <Icon size={26} color={i % 2 === 0 ? "#1E8E6B" : "#E2A63B"} strokeWidth={1.6} />
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-3 text-center">
                  {[["9", "programs"], ["1,900+", "trainees"], ["87%", "placed"]].map(([n, l]) => (
                    <div key={l} className="stat-tick px-2">
                      <div className="display text-white font-semibold text-xl">{n}</div>
                      <div className="mono text-[9.5px] text-white/50 mt-1 uppercase tracking-wider">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            <Reveal>
              <div>
                <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>ABOUT THE COLLEGE</span>
                <h2 className="display font-semibold text-3xl md:text-[2.6rem] leading-tight mt-3">
                  Practical training, built for the world of work
                </h2>
                <p className="text-[15px] leading-relaxed mt-5" style={{ color: "var(--ink-soft)" }}>
                  Gedeb TVET College trains students in Dilla, Ethiopia for real trades and real jobs.
                  Our instructors come from industry, our labs run on working equipment, and our
                  curriculum is shaped with local employers — so graduates leave with skills the
                  region actually needs, whether they're seeking employment or starting their own business.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                ["15+", "Years of service"],
                ["1,900+", "Students enrolled"],
                ["9", "Training programs"],
                ["60+", "Qualified instructors"],
                ["87%", "Graduate success rate"],
                ["120+", "Partner employers"],
              ].map(([n, l], i) => (
                <Reveal key={l} delay={i * 60}>
                  <TagFrame className="rounded-lg p-5" accent={i % 2 === 0 ? "green" : "blue"}>
                    <div className="display font-semibold text-2xl md:text-3xl" style={{ color: "var(--blue)" }}>{n}</div>
                    <div className="text-[12.5px] mt-1.5" style={{ color: "var(--ink-soft)" }}>{l}</div>
                  </TagFrame>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMS ---------------- */}
      <section id="programs" className="py-20 md:py-28" style={{ background: "var(--paper-dim)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>PROGRAMS OFFERED</span>
                <h2 className="display font-semibold text-3xl md:text-[2.4rem] mt-3">Nine trades, one workshop floor</h2>
              </div>
              <p className="max-w-sm text-[14px]" style={{ color: "var(--ink-soft)" }}>
                Every program pairs classroom fundamentals with supervised, hands-on hours in our labs and workshops.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.code} delay={(i % 3) * 90}>
                  <TagFrame className="rounded-lg p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex items-center justify-center rounded-md" style={{ width: 44, height: 44, background: "var(--green-soft)" }}>
                        <Icon size={22} color="var(--green)" strokeWidth={1.7} />
                      </span>
                      <span className="mono text-[10px]" style={{ color: "var(--ink-soft)" }}>{p.code}</span>
                    </div>
                    <h3 className="display font-semibold text-lg mt-5">{p.title}</h3>
                    <p className="text-[13.5px] leading-relaxed mt-2 flex-1" style={{ color: "var(--ink-soft)" }}>{p.desc}</p>
                    <a href="#admissions" className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-5" style={{ color: "var(--blue)" }}>
                      Learn more <ArrowUpRight size={14} />
                    </a>
                  </TagFrame>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section id="why" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>WHY CHOOSE GEDEB</span>
              <h2 className="display font-semibold text-3xl md:text-[2.4rem] mt-3">What sets our training apart</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={(i % 4) * 80}>
                  <div className="rounded-lg p-6 h-full border" style={{ borderColor: "rgba(22,50,79,0.1)" }}>
                    <Icon size={24} color="var(--blue)" strokeWidth={1.7} />
                    <h3 className="font-semibold text-[15px] mt-4">{w.title}</h3>
                    <p className="text-[13px] leading-relaxed mt-1.5" style={{ color: "var(--ink-soft)" }}>{w.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- ADMISSIONS ---------------- */}
      <section id="admissions" className="py-20 md:py-28 plate blueprint-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="mono text-[11px] tracking-widest" style={{ color: "var(--amber)" }}>ADMISSIONS</span>
              <h2 className="display font-semibold text-3xl md:text-[2.4rem] text-white mt-3">Four steps to your first day</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {ADMISSION_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.n} delay={i * 100}>
                  <div className="relative rounded-lg p-6 h-full border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="mono text-[11px] text-white/40">{s.n}</span>
                    <div className="flex items-center justify-center rounded-md mt-4 mb-4" style={{ width: 42, height: 42, background: "rgba(30,142,107,0.18)" }}>
                      <Icon size={20} color="var(--green)" />
                    </div>
                    <h3 className="text-white font-semibold text-[15px]">{s.title}</h3>
                    <p className="text-white/60 text-[13px] leading-relaxed mt-1.5">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={200}>
            <div className="text-center mt-12">
              <a href="#contact" className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-md">
                Apply Online <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FACILITIES ---------------- */}
      <section id="facilities" className="py-20 md:py-28" style={{ background: "var(--paper-dim)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="mb-12">
              <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>CAMPUS FACILITIES</span>
              <h2 className="display font-semibold text-3xl md:text-[2.4rem] mt-3">Where the training happens</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FACILITIES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 4) * 80}>
                  <TagFrame className="rounded-lg p-6 flex flex-col items-center text-center gap-3" accent="blue">
                    <span className="flex items-center justify-center rounded-full" style={{ width: 52, height: 52, background: "var(--green-soft)" }}>
                      <Icon size={24} color="var(--blue)" strokeWidth={1.6} />
                    </span>
                    <span className="font-medium text-[13.5px]">{f.title}</span>
                  </TagFrame>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- STORIES ---------------- */}
      <section id="stories" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>STUDENT SUCCESS STORIES</span>
              <h2 className="display font-semibold text-3xl md:text-[2.4rem] mt-3">Graduates, in their own words</h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-2xl mx-auto relative">
              <div className="rounded-xl p-8 md:p-10 border" style={{ borderColor: "rgba(22,50,79,0.12)", background: "#fff" }}>
                <Quote size={30} color="var(--green)" strokeWidth={1.5} />
                <p className="display text-lg md:text-xl leading-relaxed mt-5" style={{ color: "var(--ink)" }}>
                  "{STORIES[storyIdx].quote}"
                </p>
                <div className="mt-6 pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(22,50,79,0.1)" }}>
                  <div>
                    <div className="font-semibold text-sm">{STORIES[storyIdx].name}</div>
                    <div className="mono text-[11px] mt-0.5" style={{ color: "var(--ink-soft)" }}>{STORIES[storyIdx].program}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={prevStory} aria-label="Previous story" className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors" style={{ borderColor: "rgba(22,50,79,0.2)" }}>
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextStory} aria-label="Next story" className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors" style={{ borderColor: "rgba(22,50,79,0.2)" }}>
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStoryIdx(i)}
                    aria-label={`Go to story ${i + 1}`}
                    className="rounded-full transition-all"
                    style={{ width: i === storyIdx ? 20 : 7, height: 7, background: i === storyIdx ? "var(--green)" : "rgba(22,50,79,0.2)" }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- NEWS ---------------- */}
      <section id="news" className="py-20 md:py-28" style={{ background: "var(--paper-dim)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="mb-12">
              <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>LATEST NEWS &amp; EVENTS</span>
              <h2 className="display font-semibold text-3xl md:text-[2.4rem] mt-3">From around campus</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 100}>
                <article className="rounded-lg overflow-hidden border h-full flex flex-col" style={{ borderColor: "rgba(22,50,79,0.12)", background: "#fff" }}>
                  <div className="h-36 flex items-center justify-center relative" style={{ background: "var(--blue)" }}>
                    <div className="blueprint-bg absolute inset-0 opacity-40" />
                    <span className="mono text-[11px] text-white/70 relative z-10 border border-white/25 rounded-full px-3 py-1">{n.tag}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mono text-[11px]" style={{ color: "var(--ink-soft)" }}>
                      <Calendar size={12} /> {n.date}
                    </div>
                    <h3 className="font-semibold text-[16px] leading-snug mt-3">{n.title}</h3>
                    <p className="text-[13.5px] leading-relaxed mt-2 flex-1" style={{ color: "var(--ink-soft)" }}>{n.excerpt}</p>
                    <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-4" style={{ color: "var(--green)" }}>
                      Read more <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: "var(--green)" }}>
        <div className="absolute inset-0 blueprint-bg opacity-[0.08]" />
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative">
          <Reveal>
            <h2 className="display font-semibold text-3xl md:text-[2.6rem] text-white leading-tight">
              Start Your Career Journey Today
            </h2>
            <p className="text-white/85 text-[15px] md:text-base mt-4 max-w-xl mx-auto">
              Applications for the next intake at Gedeb TVET College are open now. Practical skills,
              real qualifications, a career you can build on.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="#admissions" className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-md" style={{ background: "var(--blue)", color: "#fff" }}>
                Apply Now <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3.5 rounded-md border-2 border-white text-white hover:bg-white/10 transition-colors">
                Contact Admissions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
            <Reveal>
              <div>
                <span className="mono text-[11px] tracking-widest" style={{ color: "var(--green)" }}>CONTACT</span>
                <h2 className="display font-semibold text-3xl mt-3">Get in touch</h2>
                <div className="mt-8 flex flex-col gap-5">
                  {[
                    [MapPin, "Gedeb TVET College, Dilla, Ethiopia"],
                    [Phone, "+251 972 625 665"],
                    [Mail, "admissions@gedebtvet.edu.et"],
                    [Clock, "Mon – Fri, 8:30 AM – 5:00 PM"],
                  ].map(([Icon, text], i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center rounded-md shrink-0" style={{ width: 36, height: 36, background: "var(--green-soft)" }}>
                        <Icon size={16} color="var(--green)" />
                      </span>
                      <span className="text-[14px] pt-2" style={{ color: "var(--ink-soft)" }}>{text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" aria-label="Social link" className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors" style={{ borderColor: "rgba(22,50,79,0.2)" }}>
                      <Icon size={15} color="var(--blue)" />
                    </a>
                  ))}
                </div>
                {/* interactive map placeholder */}
                <div className="mt-8 rounded-lg overflow-hidden border blueprint-bg h-40 flex items-center justify-center relative" style={{ borderColor: "rgba(22,50,79,0.15)", background: "var(--paper-dim)" }}>
                  <div className="text-center relative z-10">
                    <MapPin size={20} color="var(--blue)" className="mx-auto" />
                    <span className="mono text-[10px] block mt-2" style={{ color: "var(--ink-soft)" }}>MAP — DILLA, ETHIOPIA</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="plate pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center rounded-md" style={{ width: 30, height: 30, background: "var(--green)" }}>
                  <Cog size={16} color="#fff" />
                </span>
                <span className="text-white display font-semibold text-[15px]">Gedeb TVET College</span>
              </div>
              <p className="text-white/55 text-[13.5px] leading-relaxed mt-4 max-w-xs">
                Practical technical and vocational training in Dilla, Ethiopia — preparing learners
                for employment, entrepreneurship and lifelong learning.
              </p>
            </div>
            {[
              { title: "Quick Links", links: ["About", "Programs", "Why Gedeb", "Campus"] },
              { title: "Admissions", links: ["How to Apply", "Requirements", "Student Portal", "Fees"] },
              { title: "Resources", links: ["News", "Events", "Contact", "Careers"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-[13px] font-semibold mono tracking-wide">{col.title.toUpperCase()}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/55 hover:text-white text-[13.5px] transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7">
            <span className="text-white/45 text-[12.5px]">© 2026 Gedeb TVET College. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="text-white/45 hover:text-white text-[12.5px] transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/45 hover:text-white text-[12.5px] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="rounded-xl border p-7 md:p-8" style={{ borderColor: "rgba(22,50,79,0.12)", background: "#fff" }}>
      {sent ? (
        <div className="flex flex-col items-center text-center py-10">
          <CheckCircle2 size={34} color="var(--green)" />
          <h3 className="font-semibold text-lg mt-4">Message sent</h3>
          <p className="text-[13.5px] mt-1.5" style={{ color: "var(--ink-soft)" }}>
            Our admissions team will get back to you shortly.
          </p>
          <button onClick={() => setSent(false)} className="mt-6 text-[13px] font-semibold" style={{ color: "var(--green)" }}>
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" placeholder="Your full name" />
            <Field label="Phone number" placeholder="+251 9xx xxx xxx" />
          </div>
          <Field label="Email address" placeholder="you@example.com" type="email" />
          <Field label="Program of interest" placeholder="e.g. Information Technology" />
          <div>
            <label className="text-[12.5px] font-medium block mb-1.5" style={{ color: "var(--ink-soft)" }}>Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us how we can help"
              className="w-full rounded-md border px-3.5 py-2.5 text-[13.5px] outline-none focus:ring-2 transition-shadow"
              style={{ borderColor: "rgba(22,50,79,0.18)" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(30,142,107,0.18)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <button type="submit" className="btn-primary inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-md">
            Send message <Send size={15} />
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-[12.5px] font-medium block mb-1.5" style={{ color: "var(--ink-soft)" }}>{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border px-3.5 py-2.5 text-[13.5px] outline-none transition-shadow"
        style={{ borderColor: "rgba(22,50,79,0.18)" }}
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(30,142,107,0.18)")}
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
    </div>
  );
}
