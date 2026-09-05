"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitted(true);
  };

  return (
    <div className="auth-page-shell flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="auth-form-card w-full max-w-md"
      >
        <Link href="/" className="origin-wordmark mb-8 inline-flex font-display text-xl font-bold">
          ORIGIN POINT
        </Link>

        {isSubmitted ? (
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold">Check your inbox</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              If an account exists for that email, we&apos;ll send a password reset link shortly.
            </p>
            <Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-2 font-display text-2xl font-bold">Forgot your password?</h1>
            <p className="mb-7 text-sm leading-6 text-muted-foreground">
              Enter your account email and we&apos;ll help you get back into Origin Point.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="forgot-email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="name@university.edu"
                    className="auth-card-input pl-9"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>

              <Button type="submit" className="auth-card-submit w-full">
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
