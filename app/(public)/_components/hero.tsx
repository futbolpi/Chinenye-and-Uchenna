"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const Hero = () => {
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

  const whatsappHref = `https://wa.me/${siteConfig.rsvp.whatsapp.replace(
    /[^0-9+]/g,
    "",
  )}`;

  return (
    <>
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Heart className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 text-balance"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-light text-balance"
        >
          Together with our families, we invite you to celebrate
          <br />
          the beginning of our new journey
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" className="px-8 py-6 text-lg font-medium group">
            View Our Invitation
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg bg-transparent"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              RSVP Now
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Save the Date</p>
          <p className="font-serif text-2xl text-foreground">June 15th, 2024</p>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full"
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
        className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full"
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
    </>
  );
};

export default Hero;
