"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, Heart, CheckCircle, Loader2 } from "lucide-react";

import { completeOnboarding } from "@/actions/complete-onboarding";

type OnboardingState = "loading" | "processing" | "success" | "error";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const [state, setState] = useState<OnboardingState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOnboarding = async () => {
      if (!user) return;

      setState("processing");
      setMessage("Setting up your account...");

      try {
        const res = await completeOnboarding();

        if (res?.message) {
          setState("success");
          setMessage("Welcome! Redirecting you now...");

          // Reload user data from Clerk
          await user.reload();

          // Small delay for better UX
          setTimeout(() => {
            router.push(res.message || "/");
          }, 2000);
        }

        if (res?.error) {
          setState("error");
          setMessage(res.error);
          toast.error(res.error);
        }
      } catch (error) {
        setState("error");
        setMessage("Something went wrong. Please try again.");
        toast.error("Failed to complete onboarding");
      }
    };

    // Small delay to show the welcome message
    const timer = setTimeout(handleOnboarding, 1500);
    return () => clearTimeout(timer);
  }, [user, router]);

  const getIcon = () => {
    switch (state) {
      case "loading":
      case "processing":
        return <Loader2 className="h-8 w-8 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-primary" />;
      case "error":
        return <Heart className="h-8 w-8 text-destructive" />;
      default:
        return <Sparkles className="h-8 w-8 text-primary" />;
    }
  };

  const getTitle = () => {
    switch (state) {
      case "loading":
        return "Welcome!";
      case "processing":
        return "Setting up your account";
      case "success":
        return "All set!";
      case "error":
        return "Oops!";
      default:
        return "Welcome!";
    }
  };

  const getMessage = () => {
    switch (state) {
      case "loading":
        return "We're preparing everything for you...";
      case "processing":
      case "success":
      case "error":
        return message;
      default:
        return "Please wait while we set things up";
    }
  };

  return (
    <div className="flex items-center justify-center relative overflow-hidden bg-background">
      {/* Floating Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10"
          style={{ color: "var(--color-muted)" }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-32 right-16"
          style={{ color: "var(--color-muted)" }}
        >
          <Heart className="h-4 w-4" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-20"
          style={{ color: "var(--color-muted)" }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10 max-w-md mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          {getIcon()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-balance"
          style={{ color: "var(--color-foreground)" }}
        >
          {getTitle()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-balance leading-relaxed"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          {getMessage()}
        </motion.p>

        {/* Progress indicator */}
        {(state === "loading" || state === "processing") && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--color-muted)" }}
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="h-full w-1/3 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </motion.div>
        )}

        {/* Success checkmark animation */}
        {state === "success" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="mt-6"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <CheckCircle
                className="h-8 w-8"
                style={{ color: "var(--color-primary-foreground)" }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
