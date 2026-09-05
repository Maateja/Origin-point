"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, Search, User, LogOut, Settings, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  role?: string;
  title?: string;
  className?: string;
}

export function TopBar({ role = "student", title, className }: TopBarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY < 32);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "dashboard-top-bar sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/70 px-4 md:px-6",
        isVisible ? "" : "is-hidden",
        className
      )}
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        {title && (
          <h2 className="font-display text-lg font-semibold tracking-tight truncate">
            {title}
          </h2>
        )}
      </div>

      {/* Center: Search (desktop only) */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anything… (⌘K)"
            className="pl-9 h-9 bg-muted/50 border-transparent focus:border-border focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <ThemeToggle className="hidden md:inline-flex" />

        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -4 }}
                className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-muted-foreground">Stay on top of your progress</p>
                  </div>
                  <CheckCheck className="h-4 w-4 role-text" />
                </div>
                <div className="space-y-1 p-2">
                  <button className="w-full rounded-xl p-3 text-left transition-colors hover:bg-muted">
                    <p className="text-sm font-medium">Your profile is 74% complete</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Add your projects to unlock better matches.</p>
                  </button>
                  <button className="w-full rounded-xl p-3 text-left transition-colors hover:bg-muted">
                    <p className="text-sm font-medium">New opportunity match</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Frontend Developer Intern matches 88%.</p>
                  </button>
                </div>
                <div className="border-t border-border px-4 py-2.5">
                  <button className="text-xs font-semibold role-text">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="h-9 w-9 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Profile menu"
          >
            <div className="h-full w-full rounded-full role-gradient flex items-center justify-center text-white text-xs font-bold">
              {role.charAt(0).toUpperCase()}
            </div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-xl z-50"
              >
                <button
                  onClick={() => { setDropdownOpen(false); router.push(`/${role}/profile`); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile
                </button>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Preferences
                </button>
                <div className="border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-destructive text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
