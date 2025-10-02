"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#story"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Story
            </a>
            <a
              href="/#details"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Details
            </a>
            <a
              href="/#rsvp"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
