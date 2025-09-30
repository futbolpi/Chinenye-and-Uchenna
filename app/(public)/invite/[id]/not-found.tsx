"use client";

import { motion } from "framer-motion";
import { Heart, Home, Mail, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function InviteNotFound() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 mt-16"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--muted)] to-[var(--secondary)]" />

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Icon */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
            style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
          >
            <Search className="h-12 w-12 text-secondary" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-4xl md:text-5xl font-light mb-6 text-balance"
          style={{ color: "var(--foreground)" }}
        >
          Invitation Not Found
        </motion.h1>

        {/* Description */}
        <motion.div variants={fadeInUp} className="mb-8">
          <p
            className="text-lg md:text-xl mb-4 font-light text-balance"
            style={{ color: "var(--muted-foreground)" }}
          >
            We couldn't find the invitation you're looking for.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            This could happen if the invitation code is incorrect, expired, or
            the link was mistyped. Please check your invitation code and try
            again.
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={scaleIn}>
            <Card
              className="p-6 text-center hover:shadow-lg transition-all duration-300 border-[var(--border)]"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
              >
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3
                className="font-serif text-lg font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Check Your Invitation
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Double-check the invitation code from your physical or digital
                invitation
              </p>
            </Card>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card
              className="p-6 text-center hover:shadow-lg transition-all duration-300 border-[var(--border)]"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
              >
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3
                className="font-serif text-lg font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Contact Us
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Reach out to {siteConfig.name} if you need assistance with your
                invitation
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base font-medium group"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base bg-transparent"
            style={{ backgroundColor: "transparent" }}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}
