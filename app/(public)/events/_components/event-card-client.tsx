// components/EventCardClient.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import type { EventItem } from "@/lib/events";

export default function EventCardClient({ event }: { event: EventItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        {/* cover */}
        <div className="relative h-44 sm:h-56 w-full bg-muted">
          {event.cover ? (
            <Image
              src={event.cover}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <CardContent className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {event.summary}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {event.time && (
                <Badge className="bg-secondary text-secondary-foreground">
                  {event.time}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {event.tags?.map((t) => (
                <Badge key={t} className="bg-accent text-accent-foreground">
                  {t}
                </Badge>
              ))}
            </div>

            <Link
              href={`/events/${event.id}`}
              aria-label={`View ${event.title}`}
            >
              <Button variant="secondary" size="sm" className="cursor-pointer">
                View details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
