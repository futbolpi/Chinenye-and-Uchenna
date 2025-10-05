"use client";

import { motion } from "framer-motion";

import RsvpModal from "@/components/rsvp-modal";
import { Button } from "@/components/ui/button";

const Rsvp = () => {
  return (
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
        We can't wait to celebrate with you! Please let us know if you'll be
        joining us.
      </p>
      <RsvpModal
        trigger={
          <Button size="lg" className="px-12 py-6 text-lg font-medium">
            RSVP Now
          </Button>
        }
      />
    </motion.div>
  );
};

export default Rsvp;
