"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type InfoItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string; // ISO or friendly
  time?: string; // HH:mm or friendly
  venue?: string;
  address?: string;
  mapQuery?: string; // used to build maps link
  delay?: number; // animation delay in seconds
};

type Props = {
  item: InfoItem;
};

const buildMapsUrl = (item: InfoItem) => {
  if (item.mapQuery)
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`;
  if (item.address)
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;
  return null;
};

export default function WeddingInfoCard({ item }: Props) {
  const { title, subtitle, date, time, venue, address, delay = 0 } = item;
  const mapsUrl = buildMapsUrl(item);

  const handleCopyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    } catch (e) {
      console.error(e);
      toast.error("Could not copy address");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Card
        className="overflow-hidden shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, var(--color-card) 0%, var(--color-muted) 100%)",
        }}
      >
        <div className="flex flex-row items-stretch gap-4 p-4 sm:p-6">
          {/* Right: Content */}
          <div className="flex-1 min-w-0">
            <CardHeader className="p-0 mb-1">
              <CardTitle
                className="text-sm sm:text-base font-semibold truncate"
                style={{ color: "var(--foreground)" }}
              >
                {title}
              </CardTitle>
              {subtitle && (
                <p
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)", marginTop: 4 }}
                >
                  {subtitle}
                </p>
              )}
            </CardHeader>

            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Date & Time */}
                  {(date || time) && (
                    <div
                      className="flex items-center gap-3 text-xs sm:text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="truncate">{date}</span>
                        </div>
                      )}

                      {time && (
                        <div className="flex items-center gap-2 pl-2">
                          <Clock className="w-4 h-4" />
                          <span className="truncate">{time}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Venue */}
                  {venue && (
                    <div
                      className="mt-3 flex items-center gap-2 text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      <MapPin className="w-4 h-4" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{venue}</span>
                        {address && (
                          <span
                            className="text-xs"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {address}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  {mapsUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${venue ?? "map"} in maps`}
                        >
                          <Button variant="outline" size="sm" className="px-2">
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Open map</TooltipContent>
                    </Tooltip>
                  )}

                  {address && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="px-3"
                    >
                      Copy
                    </Button>
                  )}
                </div>
              </div>

              {/* Decorative divider */}
              <div
                className="mt-3 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--muted), transparent)",
                }}
              />
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
