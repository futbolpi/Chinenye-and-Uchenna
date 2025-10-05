"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

const WeddingDetails = () => {
  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
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
              Saturday, November 22nd, 2025
            </p>
            <p className="text-muted-foreground">11:00 AM - 5:00 PM</p>
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
            <p className="text-muted-foreground mb-2">Color code</p>
            <p className="text-muted-foreground">Purple, Gold & White</p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WeddingDetails;
