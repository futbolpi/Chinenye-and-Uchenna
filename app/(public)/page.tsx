"use client";

import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WeddingHomePage() {
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
    <div className="min-h-screen">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-secondary/20" />

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
            Chinenye & Uche
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
              RSVP Now
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Save the Date</p>
            <p className="font-serif text-2xl text-foreground">
              June 15th, 2024
            </p>
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
      </section>

      {/* Wedding Details Cards */}
      <section id="details" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Wedding Details
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All the important information for our special day
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={scaleIn}>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-border/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  When
                </h3>
                <p className="text-muted-foreground mb-2">
                  Saturday, June 15th, 2024
                </p>
                <p className="text-muted-foreground">4:00 PM - 11:00 PM</p>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-border/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  Where
                </h3>
                <p className="text-muted-foreground mb-2">Location Details</p>
                <p className="text-muted-foreground">
                  Available with your invitation
                </p>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-border/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  Dress Code
                </h3>
                <p className="text-muted-foreground mb-2">Cocktail Attire</p>
                <p className="text-muted-foreground">Garden party elegant</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                We met on a rainy Tuesday at a coffee shop downtown. What
                started as a chance encounter over spilled coffee became the
                greatest love story of our lives.
              </p>
              <p className="text-lg leading-relaxed">
                Three years later, we're ready to say "I do" surrounded by the
                people we love most. Join us as we celebrate this new chapter
                and the beginning of our forever.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">
              Join Our Celebration
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We can't wait to celebrate with you! Please let us know if you'll
              be joining us.
            </p>
            <Button size="lg" className="px-12 py-6 text-lg font-medium">
              RSVP Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
