"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  Target,
  TrendingUp,
  Award,
  BarChart3,
  Users,
  Briefcase,
  ClipboardCheck,
  FlaskConical,
  Handshake,
  PieChart,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { MatchScoreRing } from "@/components/shared/match-score-ring";
import { SkillTag } from "@/components/shared/skill-tag";
import { cn } from "@/lib/utils";
import { LandingStarfield } from "@/components/landing/starfield";
import StrokeText from "@/components/landing/StrokeText";

/* ── Realistic stub data ── */
const platformStats = [
  { value: "12,400+", label: "Students Assessed", icon: GraduationCap },
  { value: "340+", label: "Industry Partners", icon: Building2 },
  { value: "1,200+", label: "Internships Matched", icon: Briefcase },
  { value: "96%", label: "Placement Rate", icon: TrendingUp },
];

const journeySteps = [
  {
    step: "01",
    title: "Take Your Skill Assessment",
    description:
      "A dynamic, card-based assessment builds your skill radar profile in real time — not a boring multi-page form.",
    icon: Target,
    gradient: "from-indigo-500 to-cyan-400",
  },
  {
    step: "02",
    title: "Get Your Skill Gap Report",
    description:
      "A visual, shareable stat-sheet showing verified skills, gaps to close, and a personalized learning path.",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-400",
  },
  {
    step: "03",
    title: "Match to Opportunities",
    description:
      "Our matching engine connects your skills to internships, jobs, and training programs — scored visually, not just by keywords.",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    step: "04",
    title: "Build Your Verified Portfolio",
    description:
      "A trading-card style digital portfolio with badges, timelines, and verified credentials — what recruiters actually look at.",
    icon: Award,
    gradient: "from-violet-500 to-purple-400",
  },
];

const roles = [
  {
    id: "student",
    title: "Students",
    description: "Assess → Match → Grow. Build a verified portfolio that gets you hired.",
    icon: GraduationCap,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    features: ["Skill assessment & gap analysis", "Smart internship matching", "Digital portfolio builder"],
  },
  {
    id: "industry",
    title: "Industries",
    description: "Post opportunities and find pre-matched, skill-verified candidates.",
    icon: Building2,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    features: ["Post internships & jobs", "Kanban candidate shortlisting", "Run training programs"],
  },
  {
    id: "academician",
    title: "Academicians",
    description: "FDPs, consultancy, and collaborative research — all in one portal.",
    icon: BookOpen,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    features: ["Faculty development programs", "Industry consultancy", "Research collaboration"],
  },
  {
    id: "institution",
    title: "Institutions",
    description: "Monitor skill development, placement readiness, and recruitment outcomes.",
    icon: Landmark,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    features: ["Skill analytics dashboards", "Placement tracking", "Cohort-level reporting"],
  },
];

const stakeholderJourneySteps = [
  {
    id: "industry",
    label: "The Industry Journey",
    title: "From Hiring Need to Team Impact — One Clear Flow",
    description: "See how an industry team can find, evaluate, and grow the right talent on Origin Point.",
    steps: [
      { title: "Post an Opportunity", description: "Create a clear internship, job, or training brief with the exact skills your team needs.", icon: Briefcase, gradient: "from-amber-500 to-orange-400" },
      { title: "Discover Verified Candidates", description: "Review skill-based matches with portfolios, assessment scores, and project evidence in one view.", icon: Users, gradient: "from-orange-500 to-rose-400" },
      { title: "Shortlist & Collaborate", description: "Move candidates through review, interviews, and team feedback without losing context.", icon: ClipboardCheck, gradient: "from-rose-500 to-pink-400" },
      { title: "Hire & Build Programs", description: "Make the offer, mentor new talent, and create programs that keep your pipeline growing.", icon: TrendingUp, gradient: "from-violet-500 to-indigo-400" },
    ],
  },
  {
    id: "academician",
    label: "The Academician Journey",
    title: "From Expertise to Shared Impact — One Connected Flow",
    description: "See how academicians can connect teaching, consultancy, research, and student guidance on Origin Point.",
    steps: [
      { title: "Create Your Expertise Profile", description: "Showcase your subjects, research interests, publications, and industry experience.", icon: BookOpen, gradient: "from-emerald-500 to-teal-400" },
      { title: "Explore FDPs & Consultancy", description: "Find faculty development programs and consultancy briefs that match your strengths.", icon: Handshake, gradient: "from-teal-500 to-cyan-400" },
      { title: "Collaborate on Research", description: "Meet aligned researchers, labs, and organisations to move meaningful ideas forward.", icon: FlaskConical, gradient: "from-cyan-500 to-blue-400" },
      { title: "Guide Student Internships", description: "Share live opportunities, mentor learners, and connect classroom learning to real work.", icon: UserCheck, gradient: "from-blue-500 to-violet-400" },
    ],
  },
  {
    id: "institution",
    label: "The Institution Journey",
    title: "From Campus Signals to Better Outcomes — One Clear Flow",
    description: "See how institutions can understand readiness, coordinate partners, and improve student outcomes.",
    steps: [
      { title: "Connect Cohorts & Departments", description: "Bring students, departments, faculty, and programs into one shared institutional view.", icon: Building2, gradient: "from-blue-600 to-indigo-500" },
      { title: "Track Skill Analytics", description: "Read verified skills and emerging gaps early so teams can plan focused interventions.", icon: BarChart3, gradient: "from-indigo-500 to-violet-500" },
      { title: "Coordinate Recruitment", description: "Manage employers, openings, placement drives, and shortlists with less manual effort.", icon: PieChart, gradient: "from-violet-500 to-fuchsia-400" },
      { title: "Support Students & Measure Impact", description: "Assign mentors, celebrate progress, and follow placement outcomes across every cohort.", icon: Target, gradient: "from-fuchsia-500 to-rose-400" },
    ],
  },
];

const testimonials = [
  {
    quote: "Origin Point's assessment showed me exactly where my gaps were. I landed my dream internship within 3 weeks.",
    name: "Priya Sharma",
    role: "Computer Science, 3rd Year",
    avatar: "PS",
  },
  {
    quote: "We reduced our campus recruitment time by 60%. The match scoring is incredibly accurate.",
    name: "Rajesh Menon",
    role: "HR Director, TechCorp India",
    avatar: "RM",
  },
  {
    quote: "Finally, one platform that connects my research with industry needs. The consultancy flow is seamless.",
    name: "Dr. Ananya Patel",
    role: "Associate Professor, IIT Bombay",
    avatar: "AP",
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <nav className={`landing-nav fixed left-0 right-0 top-0 z-sticky text-white ${hasScrolled ? "landing-nav-scrolled" : ""}`}>
        <div className="w-full px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="origin-wordmark font-display text-xl font-bold tracking-tight">ORIGIN POINT</span>
          </Link>


          <div className="flex items-center gap-2">
            <Link href="/signup" className="animated-button" aria-label="Get Started">
              <span className="text">Get Started</span>
              <span className="circle" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="landing-hero relative flex min-h-[100vh] items-center overflow-hidden bg-slate-950 pb-10 pt-20 text-white">
        <LandingStarfield />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),transparent_30%)]" />
        <div className="absolute inset-0 dot-pattern opacity-15" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative mx-auto w-full max-w-[1800px] px-6 sm:px-10 lg:px-14"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
            <div className="relative z-10 max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >


                <StrokeText
                  text={"One Platform.\nEvery Skill.\nEvery Opportunity."}
                  strokeColor="#A78BFA"
                  fillColor="#F8FAFC"
                  strokeWidth={1.4}
                  drawDuration={5.5}
                  fillDelay={0.65}
                  stagger={0.14}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize={128}
                  fontWeight={800}
                  letterSpacing={-4}
                  reverse={false}
                  loopPause={5}
                  className="mt-6 text-left font-display text-hero font-bold tracking-tight text-balance"
                  lineClassNames={[
                    "text-white",
                    "bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent",
                    "text-white",
                  ]}
                />

              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="w-full lg:max-w-[820px] lg:justify-self-end">
                <div className="mb-5 flex w-full items-center rounded-2xl border border-white/15 bg-slate-950/30 px-5 py-3 shadow-xl shadow-black/15 backdrop-blur-md">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/70">Trending in Tech</span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                  {
                    title: "OpenAI launches Astra, its powerful new model",
                    description: "A new frontier model focused on computer use, browser tasks, coding, and cybersecurity.",
                    source: "TechCrunch · Sep 3, 2026",
                    href: "https://techcrunch.com/2026/09/03/openai-launches-astra-its-powerful-and-controversial-new-model/",
                    image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
                    alt: "OpenAI logo"
                  },
                  {
                    title: "Anthropic releases Fable and Mythos 5.1",
                    description: "The new releases bring performance upgrades, lower token costs, and expanded privacy options.",
                    source: "TechCrunch · Sep 1, 2026",
                    href: "https://techcrunch.com/2026/09/01/anthropics-new-fable-release-is-cheaper-less-restrictive/",
                    image: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
                    alt: "Anthropic logo"
                  },
                  {
                    title: "CrowdStrike unveils coordinated agentic SOC",
                    description: "Multi-agent investigations now connect endpoint, identity, SaaS, cloud, and network signals.",
                    source: "CrowdStrike · Sep 2, 2026",
                    href: "https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-unveils-next-evolution-agentic-soc",
                    image: "https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128",
                    alt: "CrowdStrike logo"
                  },
                  {
                    title: "HPE and Oracle deepen AI infrastructure collaboration",
                    description: "The expanded partnership supports networking across Oracle’s growing AI data-center footprint.",
                    source: "HPE · Sep 2, 2026",
                    href: "https://www.hpe.com/us/en/newsroom/press-release/2026/09/hpe-and-oracle-deepen-networking-collaboration-to-accelerate-gigawatt-scale-ai-infrastructure.html",
                    image: "https://www.google.com/s2/favicons?domain=hpe.com&sz=128",
                    alt: "HPE logo"
                  },
                  {
                    title: "F5 adds AI-powered protection for emerging cyber risks",
                    description: "New WAF and runtime security updates help teams patch faster as AI-driven threats accelerate.",
                    source: "F5 · Sep 1, 2026",
                    href: "https://www.f5.com/company/news/press-releases/virtual-patching-ai-powered-waf-runtime-security",
                    image: "https://www.google.com/s2/favicons?domain=f5.com&sz=128",
                    alt: "F5 logo"
                  },
                  {
                    title: "Broadcom introduces VMware Private AI Cloud",
                    description: "Private cloud and AI infrastructure come together for more secure, controlled enterprise inference.",
                    source: "Broadcom · Aug 31, 2026",
                    href: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-introduces-vmware-private-ai-cloud-enabling-enterprises",
                    image: "https://www.google.com/s2/favicons?domain=broadcom.com&sz=128",
                    alt: "Broadcom logo"
                  }
                  ].map((news, i) => (
                    <a href={news.href} target="_blank" rel="noreferrer" key={i} className="h-full">
                      <div className="group h-full min-h-[154px] cursor-pointer rounded-2xl border border-white/15 bg-slate-950/30 p-5 shadow-xl shadow-black/15 backdrop-blur-md transition-all hover:border-cyan-300/50 hover:bg-slate-950/45 hover:shadow-glow">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-lg shadow-black/20">
                            <img src={news.image} alt={news.alt} className="h-full w-full object-contain" loading="lazy" />
                          </div>
                          <div className="min-w-0">
                          <h3 className="font-display text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-cyan-100">
                            {news.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">{news.description}</p>
                          <p className="mt-1.5 font-display text-sm text-white/55">{news.source}</p>
                          </div>
                        </div>
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>


        </motion.div>
      </section>

      {/* ═══════════ Portals Section ═══════════ */}
      <section id="roles" className="relative bg-card/30 py-16 md:py-20">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-emerald-500">Four Portals, One Platform</p>
              <h2 className="font-display text-display-sm font-bold tracking-tight text-balance md:text-display-md">Built for Every Stakeholder in the Ecosystem</h2>
              <p className="mt-4 text-lg text-muted-foreground">Choose your path and get a workspace designed around the work you actually do.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, i) => (
              <FadeInWhenVisible key={role.id} delay={i * 0.08} pop replay>
                <Card className="group relative h-full overflow-hidden border-border transition-all duration-normal hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border", role.color)}><role.icon className="h-5 w-5" /></div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{role.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{role.description}</p>
                    <div className="mt-6 space-y-2 border-t border-border pt-5">
                      {role.features.map((feature) => <div key={feature} className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />{feature}</div>)}
                    </div>
                    <Link href="/signup" className="mt-6 inline-flex items-center text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">Explore this portal<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Journey Section ═══════════ */}
      <section id="journey" className="relative pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-medium role-text uppercase tracking-wider mb-3 text-indigo-500">
                The Student Journey
              </p>
              <h2 className="font-display text-display-sm md:text-display-md font-bold tracking-tight text-balance">
                From Assessment to Career — One Seamless Flow
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Follow Priya&apos;s journey from her first skill assessment to landing 
                a verified internship in 3 weeks.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            {journeySteps.map((step, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.15}>
                <Card className="group relative overflow-hidden border-border hover:border-foreground/10 transition-all duration-normal hover:shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                        step.gradient
                      )}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-mono text-muted-foreground mb-1">
                          Step {step.step}
                        </p>
                        <h3 className="font-display text-lg font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover gradient */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-slow bg-gradient-to-br pointer-events-none",
                      step.gradient
                    )} />
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Stakeholder Journeys Section ═══════════ */}
      {stakeholderJourneySteps.map((journey) => (
        <section id={`${journey.id}-journey`} key={journey.id} className="relative pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FadeInWhenVisible>
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider role-text">{journey.label}</p>
                <h2 className="font-display text-display-sm font-bold tracking-tight text-balance md:text-display-md">{journey.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{journey.description}</p>
              </div>
            </FadeInWhenVisible>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {journey.steps.map((step, index) => (
                <FadeInWhenVisible key={step.title} delay={index * 0.12}>
                  <Card className="group relative h-full overflow-hidden border-border transition-all duration-normal hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br", step.gradient)}><step.icon className="h-6 w-6 text-white" /></div>
                        <div className="flex-1">
                          <p className="mb-1 text-xs font-mono text-muted-foreground">Step {String(index + 1).padStart(2, "0")}</p>
                          <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-slow group-hover:opacity-5", step.gradient)} />
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Legacy role section retained for source compatibility */}
      <section id="legacy-roles" className="hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-medium text-emerald-500 uppercase tracking-wider mb-3">
                Four Portals, One Platform
              </p>
              <h2 className="font-display text-display-sm md:text-display-md font-bold tracking-tight text-balance">
                Built for Every Stakeholder in the Ecosystem
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {roles.map((role, i) => (
              <FadeInWhenVisible key={role.id} delay={i * 0.1}>
                <Card className="group relative overflow-hidden h-full border-border hover:shadow-lg transition-all duration-normal">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={cn(
                      "h-11 w-11 rounded-xl border flex items-center justify-center mb-4",
                      role.color
                    )}>
                      <role.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1.5">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {role.description}
                    </p>
                    <ul className="space-y-1.5">
                      {role.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/signup"
                      className="mt-5 inline-flex items-center text-xs font-medium group-hover:text-foreground text-muted-foreground transition-colors"
                    >
                      Get Started
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-cyan-500 to-emerald-400 p-8 text-center text-white md:p-14">
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="relative">
                <h2 className="mb-4 font-display text-display-sm font-bold tracking-tight md:text-display-md">
                  Ready to Build Your{" "}
                  <br className="hidden sm:block" />
                  Career With Data?
                </h2>
                <p className="mx-auto mb-8 max-w-lg text-lg text-white/80">
                  Join 12,400+ students and 340+ industry partners already on the
                  platform. Your skill assessment takes just 15 minutes.
                </p>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="h-12 bg-white px-8 text-base font-semibold text-gray-900 hover:bg-white/90"
                  >
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

    </div>
  );
}

/* ══════ Helper Components ══════ */

function FadeInWhenVisible({ children, delay = 0, pop = false, replay = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !replay, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: pop ? 0.92 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: pop ? 0.92 : 1 }}
      transition={{
        duration: pop ? 0.72 : 0.6,
        delay,
        ease: pop ? [0.34, 1.56, 0.64, 1] : [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroSkillVisual() {
  const quotes = [
    {
      text: "The future belongs to those who learn more skills and combine them in creative ways.",
      author: "Robert Greene",
    },
    {
      text: "Your skills are your currency; the more you invest in them, the richer your career becomes.",
      author: "Unknown",
    },
    {
      text: "Bridging the gap between what you know and what the world needs.",
      author: "Origin Point Vision",
    },
    {
      text: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 blur-3xl" />

      {/* Decorative accent lines */}
      <svg className="absolute inset-0 w-full h-full text-border opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" />
      </svg>

      <div className="relative w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-sm"
          >
            {/* Quotation mark decoration */}
            <div className="absolute -top-4 -left-2 text-5xl text-indigo-500/20 font-serif leading-none select-none">
              &ldquo;
            </div>

            <p className="relative font-display text-lg sm:text-xl font-medium leading-relaxed text-foreground text-balance">
              {quotes[currentIndex].text}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                {quotes[currentIndex].author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{quotes[currentIndex].author}</span>
                <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium">
                  Inspiration
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating elements to keep it dynamic */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 -right-4 h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg opacity-80"
        >
          <Award className="h-6 w-6 text-white" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-6 -left-6 h-14 w-14 rounded-full bg-gradient-to-bl from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg border border-white/20 opacity-90"
        >
          <Target className="h-7 w-7 text-white" />
        </motion.div>
      </div>
    </div>
  );
}
