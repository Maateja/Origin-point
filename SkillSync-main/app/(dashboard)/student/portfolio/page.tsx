"use client";

import { motion } from "framer-motion";
import { Award, Share2, Download, Plus, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const badges = [
  { title: "React Developer",    level: "Proficient", color: "from-indigo-500 to-cyan-400",  earned: true },
  { title: "SQL Expert",         level: "Intermediate", color: "from-emerald-500 to-teal-400", earned: true },
  { title: "DSA Champion",       level: "Advanced",     color: "from-amber-500 to-orange-400", earned: true },
  { title: "System Architect",   level: "Beginner",     color: "from-violet-500 to-purple-400", earned: false },
];

const timeline = [
  { type: "Internship",  title: "Frontend Intern", org: "TechCorp India",   date: "Jun–Aug 2026", verified: true },
  { type: "Project",     title: "E-Commerce App",  org: "Personal Project", date: "Mar 2026",     verified: false },
  { type: "Certification", title: "React – Meta",  org: "Coursera",         date: "Jan 2026",     verified: true },
  { type: "Education",   title: "B.Tech CS",       org: "IIT Delhi",        date: "2023–Present", verified: true },
];

const skills = ["React", "TypeScript", "Node.js", "Python", "SQL", "Figma", "Git", "REST APIs"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
} as const;

export default function PortfolioPage() {
  return (
    <DashboardShell role="student" title="Portfolio">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Profile card */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="h-20 w-20 rounded-full role-gradient flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                S
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-bold">Student User</h2>
                <p className="text-muted-foreground text-sm">B.Tech Computer Science · IIT Delhi</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
                <Button size="sm" className="gap-1.5 bg-gradient-to-r from-[hsl(var(--role-gradient-from))] to-[hsl(var(--role-gradient-to))] text-white border-0">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Badges */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Skill Badges</CardTitle>
                <CardDescription>Earned through verified assessments</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.title}
                    className={`relative p-4 rounded-xl border text-center transition-all ${badge.earned ? "border-border hover:shadow-md" : "border-dashed border-muted-foreground/30 opacity-50"}`}
                  >
                    <div className={`h-12 w-12 mx-auto rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-2`}>
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-xs font-semibold">{badge.title}</p>
                    <p className="text-[0.6rem] text-muted-foreground">{badge.level}</p>
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60">
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Experience Timeline</CardTitle>
                <CardDescription>Your education, projects & internships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4 pl-5 before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-px before:bg-border">
                  {timeline.map((entry) => (
                    <div key={entry.title} className="relative">
                      <div className="absolute -left-5 top-1 h-3 w-3 rounded-full border-2 border-background ring-2 ring-[hsl(var(--role-primary))] bg-background" />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold">{entry.title}</p>
                            {entry.verified && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{entry.org}</p>
                          <p className="text-[0.6rem] text-muted-foreground mt-0.5">{entry.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-[0.6rem] flex-shrink-0">{entry.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </motion.div>
    </DashboardShell>
  );
}
