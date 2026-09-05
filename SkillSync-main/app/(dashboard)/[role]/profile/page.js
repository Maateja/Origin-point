"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MapPin, Save, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";

const roleConfig = {
  student: {
    label: "Student",
    title: "Build a profile employers remember",
    description: "Tell us what you are learning, building, and looking for next.",
    name: "Priya Sharma",
    headline: "Frontend developer in the making",
    location: "Bengaluru, India",
    bio: "I enjoy turning thoughtful ideas into simple, useful digital experiences.",
    skills: ["React", "JavaScript", "TypeScript", "Figma"],
  },
  industry: {
    label: "Industry",
    title: "Make your organisation discoverable",
    description: "Set up the details candidates need before they apply.",
    name: "TechCorp India",
    headline: "Building products for a connected world",
    location: "Bengaluru, India",
    bio: "We partner with emerging talent to solve meaningful problems at scale.",
    skills: ["Product", "Engineering", "Mentorship", "Hiring"],
  },
  academician: {
    label: "Academician",
    title: "Share your expertise with the right partners",
    description: "Create a profile for research, consultancy, and collaboration.",
    name: "Dr. Ananya Rao",
    headline: "Professor of Computer Science",
    location: "Hyderabad, India",
    bio: "I work at the intersection of applied research, teaching, and industry collaboration.",
    skills: ["Research", "Teaching", "AI", "Consultancy"],
  },
  institution: {
    label: "Institution",
    title: "Give your institution a clear presence",
    description: "Add the details that help partners and students connect with you.",
    name: "Northstar University",
    headline: "Preparing students for the future of work",
    location: "Pune, India",
    bio: "We connect education, industry, and opportunity through measurable outcomes.",
    skills: ["Placements", "Analytics", "Partnerships", "Student Success"],
  },
};

const profileSteps = [
  { label: "Basic information", done: true },
  { label: "Add a short bio", done: true },
  { label: "Add skills or focus areas", done: false },
  { label: "Add a profile photo", done: false },
];

export default function ProfilePage({ params }) {
  const config = roleConfig[params.role] || roleConfig.student;
  const [form, setForm] = useState({
    name: config.name,
    headline: config.headline,
    location: config.location,
    bio: config.bio,
  });
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <DashboardShell role={params.role} title="Profile">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href={`/${params.role}`} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard</Link>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] role-text">{config.label} profile</p>
            <h1 className="font-display text-3xl font-bold tracking-tight">{config.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{config.description}</p>
          </div>
          <Button onClick={() => setSaved(true)} className="gap-2 bg-gradient-to-r from-[hsl(var(--role-gradient-from))] to-[hsl(var(--role-gradient-to))] text-white shadow-md hover:opacity-90"><Save className="h-4 w-4" /> {saved ? "Changes saved" : "Save profile"}</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <Card className="overflow-hidden">
            <div className="h-24 role-gradient" />
            <CardHeader className="relative pb-4 pt-0">
              <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-card role-gradient text-2xl font-bold text-white shadow-lg"><UserRound className="h-8 w-8" /></div>
                <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted">Change photo</button>
              </div>
              <div className="mt-4"><CardTitle>Profile details</CardTitle><CardDescription>Keep these details current so your recommendations stay relevant.</CardDescription></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm font-medium">Name / organisation<Input value={form.name} onChange={(event) => updateField("name", event.target.value)} /></label>
                <label className="space-y-1.5 text-sm font-medium">Headline<Input value={form.headline} onChange={(event) => updateField("headline", event.target.value)} /></label>
              </div>
              <label className="space-y-1.5 text-sm font-medium">Location<div className="relative"><MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" value={form.location} onChange={(event) => updateField("location", event.target.value)} /></div></label>
              <label className="space-y-1.5 text-sm font-medium">About you<textarea value={form.bio} onChange={(event) => updateField("bio", event.target.value)} className="flex min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30" /></label>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="role-gradient-subtle"><CardHeader><div className="flex items-center gap-2"><div className="rounded-lg role-bg-soft p-2 role-text"><Sparkles className="h-4 w-4" /></div><div><CardTitle>Profile strength</CardTitle><CardDescription>Good start — keep going</CardDescription></div></div></CardHeader><CardContent><div className="flex items-end justify-between"><span className="font-display text-4xl font-bold">74<span className="text-lg text-muted-foreground">%</span></span><span className="text-xs font-semibold role-text">2 steps left</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-background/70"><div className="h-full w-[74%] rounded-full role-gradient" /></div></CardContent></Card>
            <Card><CardHeader><CardTitle>Complete your setup</CardTitle><CardDescription>Profiles with more context get better matches.</CardDescription></CardHeader><CardContent className="space-y-3">{profileSteps.map((step) => <div key={step.label} className="flex items-center gap-3 text-sm"><span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", step.done ? "border-green-500 bg-green-500 text-white" : "border-border text-transparent")}><Check className="h-3 w-3" /></span><span className={cn(step.done && "text-muted-foreground line-through")}>{step.label}</span></div>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Focus areas</CardTitle><CardDescription>These help us personalise your workspace.</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2">{config.skills.map((skill) => <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">{skill}</Badge>)}<button className="rounded-full border border-dashed border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-[hsl(var(--role-primary)/0.4)] hover:text-foreground">+ Add focus area</button></CardContent></Card>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
