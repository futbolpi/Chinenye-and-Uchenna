"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeddingInformation = () => {
  return (
    <Card
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-card)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
      }}
    >
      <CardHeader>
        <CardTitle
          className="text-2xl font-serif flex items-center gap-3"
          style={{ color: "var(--color-foreground)" }}
        >
          <Sparkles
            className="h-6 w-6"
            style={{ color: "var(--color-primary)" }}
          />
          Wedding Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-4 p-4 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-muted) 0%, var(--color-secondary) 100%)",
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--color-background)",
              borderRadius: "0.5rem",
            }}
          >
            <Calendar
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <div>
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--color-foreground)" }}
            >
              Saturday, June 15th, 2024
            </p>
            <p style={{ color: "var(--color-muted-foreground)" }}>
              Save the date!
            </p>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-4 p-4 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-muted) 100%)",
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--color-background)",
              borderRadius: "0.5rem",
            }}
          >
            <Clock
              className="h-5 w-5"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
          <div>
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--color-foreground)" }}
            >
              4:00 PM - 11:00 PM
            </p>
            <p style={{ color: "var(--color-muted-foreground)" }}>
              Ceremony begins at 4:30 PM
            </p>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-4 p-4 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-muted) 0%, var(--color-secondary) 100%)",
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--color-background)",
              borderRadius: "0.5rem",
            }}
          >
            <MapPin
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <div className="flex-1">
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--color-foreground)" }}
            >
              The Grand Ballroom
            </p>
            <p
              style={{ color: "var(--color-muted-foreground)" }}
              className="mb-3"
            >
              123 Wedding Lane, Celebration City, CA 90210
            </p>
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-primary)",
                backgroundColor: "var(--color-background)",
              }}
              className="hover:bg-muted bg-transparent"
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=123+Wedding+Lane,+Celebration+City,+CA+90210",
                  "_blank",
                )
              }
            >
              <MapPin className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default WeddingInformation;
