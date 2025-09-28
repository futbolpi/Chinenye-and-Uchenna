"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InviteDisplayProps {
  isAlreadyUsed: boolean;
}

export function InviteDisplay({ isAlreadyUsed }: InviteDisplayProps) {
  if (isAlreadyUsed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <Card
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-card)",
            backdropFilter: "blur(8px)",
          }}
        >
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center"
            >
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--color-muted)",
                  borderRadius: "50%",
                }}
              >
                <Heart
                  className="h-8 w-8"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
            </motion.div>
            <CardTitle
              style={{ color: "var(--color-primary)" }}
              className="text-xl"
            >
              Invitation Already Used
            </CardTitle>
            <CardDescription style={{ color: "var(--color-muted-foreground)" }}>
              This invitation has already been redeemed and cannot be used
              again.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6 pt-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div
          style={{
            padding: "1.5rem",
            background:
              "linear-gradient(135deg, var(--color-muted) 0%, var(--color-secondary) 100%)",
            borderRadius: "50%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <Heart
            className="h-12 w-12"
            style={{
              color: "var(--color-primary)",
              fill: "var(--color-muted)",
            }}
          />
        </div>
      </motion.div>
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-serif"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          You're Invited!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          Welcome to our special day
        </motion.p>
      </div>
    </motion.div>
  );
}
