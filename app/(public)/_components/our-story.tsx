"use client";

import { motion } from "framer-motion";

const OurStory = () => {
  return (
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
          Nice story to catch at the reception.
        </p>
        {/* <p className="text-lg leading-relaxed">
          Three years later, we're ready to say "I do" surrounded by the people
          we love most. Join us as we celebrate this new chapter and the
          beginning of our forever.
        </p> */}
      </div>
    </motion.div>
  );
};

export default OurStory;
