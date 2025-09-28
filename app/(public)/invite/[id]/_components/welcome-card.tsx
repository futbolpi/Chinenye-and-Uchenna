"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WelcomeCardProps = { guestName: string };

const WelcomeCard = ({ guestName }: WelcomeCardProps) => {
  return (
    <Card
      style={{
        borderColor: "var(--color-border)",
        background:
          "linear-gradient(135deg, var(--color-card) 0%, var(--color-muted) 100%)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
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
              padding: "0.75rem",
              backgroundColor: "var(--color-secondary)",
              borderRadius: "50%",
            }}
          >
            <CheckCircle
              className="h-8 w-8"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
        </motion.div>
        <CardTitle
          style={{ color: "var(--color-primary)" }}
          className="text-xl"
        >
          Welcome, {guestName}!
        </CardTitle>
        <CardDescription style={{ color: "var(--color-muted-foreground)" }}>
          Here are the details for our wedding celebration
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WelcomeCard;
