"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const skillBreakdown = [
  { skill: "Programming & DSA", score: 82, benchmark: 75, trend: "up" },
  { skill: "Web Development",   score: 74, benchmark: 78, trend: "down" },
  { skill: "Database & SQL",    score: 61, benchmark: 65, trend: "up" },
  { skill: "System Design",     score: 45, benchmark: 60, trend: "neutral" },
  { skill: "Soft Skills",       score: 70, benchmark: 70, trend: "neutral" },
];

const gapRecommendations = [
  { gap: "System Design",   resource: "Grokking the System Design Interview", priority: "High" },
  { gap: "Web Development", resource: "Advanced React Patterns – Coursera",   priority: "Medium" },
  { gap: "Database & SQL",  resource: "SQL Advanced Queries – Udemy",          priority: "Medium" },
];

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

export default function SkillReportPage() {
  const overallScore = Math.round(skillBreakdown.reduce((a, s) => a + s.score, 0) / skillBreakdown.length);

  return (
    <DashboardShell role="student" title="Skill Report">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Summary banner */}
        <motion.div variants={item}>
          <div className="relative overflow-hidden rounded-xl role-gradient p-6 md:p-8 text-white">
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">Your Skill Report</h2>
                <p className="text-white/70 text-sm">Based on your latest assessment — last updated today</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold">{overallScore}%</p>
                  <p className="text-white/60 text-xs">Overall Score</p>
                </div>
                <Button className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border-0 gap-2">
                  <Download className="h-4 w-4" /> Export PDF
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill bars */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Your score vs. industry benchmark (percentage)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {skillBreakdown.map((s) => (
                <div key={s.skill}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{s.skill}</span>
                      {s.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
                      {s.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                      {s.trend === "neutral" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Benchmark: {s.benchmark}%</span>
                      <span className="font-display font-bold text-foreground text-sm">{s.score}%</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    {/* Benchmark marker */}
                    <div
                      className="absolute top-0 h-full w-0.5 bg-border z-10"
                      style={{ left: `${s.benchmark}%` }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: s.score >= s.benchmark
                          ? "hsl(142 72% 50%)"
                          : `linear-gradient(90deg, hsl(var(--role-gradient-from)), hsl(var(--role-gradient-to)))`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Gap recommendations */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Gap Recommendations</CardTitle>
              <CardDescription>Suggested resources to close your skill gaps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {gapRecommendations.map((rec) => (
                <div key={rec.gap} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:shadow-sm transition-all">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{rec.gap}</p>
                    <p className="text-xs text-muted-foreground">{rec.resource}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      rec.priority === "High"
                        ? "bg-red-500/10 text-red-600 text-[0.6rem]"
                        : "bg-amber-500/10 text-amber-600 text-[0.6rem]"
                    }
                  >
                    {rec.priority} Priority
                  </Badge>
                  <Button size="sm" variant="outline" className="text-xs">Start</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </DashboardShell>
  );
}
