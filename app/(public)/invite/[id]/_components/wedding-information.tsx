"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeddingInfoCard from "./wedding-info-card";

type InfoItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  time?: string;
  venue?: string;
  address?: string;
  mapQuery?: string; // used to build maps link
  delay?: number;
};

const INFO: InfoItem[] = [
  {
    id: "church-wedding",
    title: "Church Wedding",
    date: "Nov 22nd, 2025",
    time: "10:00 AM",
    venue: "Church of the Assumption Parish",
    address: "2 Kwame Nkrumah Crescent, Asokoro, Abuja",

    delay: 0.3,
  },
  {
    id: "reception",
    title: "Reception",
    date: "Nov 22nd, 2025",
    time: "1:00 PM",
    venue: "Signature Hall by Wells Carlton",
    address:
      "The Wells Carlton Hotels & Apartments. 8 Gado Nasko Close Off Jose Marti Street Asokoro Abuja.",

    delay: 0.45,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: i * 0.05,
    },
  }),
};

const WeddingInformation: React.FC = () => {
  return (
    <Card
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-card)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex flex-col gap-4"
        >
          {INFO.map((info) => (
            <WeddingInfoCard item={info} key={info.id} />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default WeddingInformation;
