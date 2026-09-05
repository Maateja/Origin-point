"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle2, Circle, ChevronRight, Timer, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const assessmentCategories = [
  { id: 1, title: "Programming & DSA", questions: 20, duration: "25 min", status: "completed", score: 82 },
  { id: 2, title: "Web Development",   questions: 15, duration: "20 min", status: "completed", score: 74 },
  { id: 3, title: "Database & SQL",    questions: 12, duration: "15 min", status: "in-progress", score: null },
  { id: 4, title: "System Design",     questions: 10, duration: "20 min", status: "locked",      score: null },
  { id: 5, title: "Soft Skills",       questions: 8,  duration: "10 min", status: "locked",      score: null },
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

export default function SkillAssessmentPage() {
  return (
    <DashboardShell role="student" title="Skill Assessment">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Header banner */}
        <motion.div variants={item}>
          <div className="relative overflow-hidden rounded-xl role-gradient p-6 md:p-8 text-white">
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">Your Skill Assessment</h2>
                <p className="text-white/70 text-sm">
                  Complete all modules to unlock your full Skill Report and matched opportunities.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="font-display text-3xl font-bold">2/5</p>
                  <p className="text-white/60 text-xs">Modules Done</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assessment modules */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Assessment Modules</CardTitle>
              <CardDescription>Complete each module to build your skill radar profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {assessmentCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[hsl(var(--role-primary)/0.3)] transition-all"
                >
                  <div className="flex-shrink-0">
                    {cat.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : cat.status === "in-progress" ? (
                      <Timer className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-semibold">{cat.title}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          cat.status === "completed" ? "bg-green-500/10 text-green-600 text-[0.6rem]" :
                          cat.status === "in-progress" ? "bg-amber-500/10 text-amber-600 text-[0.6rem]" :
                          "text-[0.6rem]"
                        }
                      >
                        {cat.status === "completed" ? "Done" : cat.status === "in-progress" ? "In Progress" : "Locked"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cat.questions} questions · {cat.duration}
                    </p>
                  </div>

                  <div className="text-right">
                    {cat.score !== null ? (
                      <div>
                        <p className="font-display text-lg font-bold role-text">{cat.score}%</p>
                        <p className="text-[0.6rem] text-muted-foreground">Score</p>
                      </div>
                    ) : cat.status === "in-progress" ? (
                      <Button size="sm" className="bg-gradient-to-r from-[hsl(var(--role-gradient-from))] to-[hsl(var(--role-gradient-to))] text-white border-0 text-xs">
                        Continue <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="text-xs opacity-50">
                        Locked
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div variants={item}>
          <Card className="border-dashed">
            <CardContent className="p-5 flex items-start gap-3">
              <Zap className="h-5 w-5 role-text flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold mb-1">Tips for a better score</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Take the assessment in a distraction-free environment</li>
                  <li>Each module is timed — read questions carefully before answering</li>
                  <li>You can retake any module once every 7 days to improve your score</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </DashboardShell>
  );
}
