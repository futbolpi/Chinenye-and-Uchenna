import type { Metadata } from "next";
import Video from "next-video"; // next-video usage per README

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { events } from "@/lib/events";
import heroVideo from "@/videos/hero.mp4";
import EventCardClient from "./_components/event-card-client";

export const metadata: Metadata = {
  title: `Events — ${siteConfig.name}`,
  description:
    "Wedding events — join us for the traditional, church service, and reception.",
};

export default function EventsPage() {
  return (
    <div className="bg-background text-foreground p-4 mt-8">
      {/* Hero Video */}
      <section className="relative">
        <div className="container mx-auto py-8">
          <div className="rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="w-full aspect-video bg-black">
              <Video
                src={heroVideo}
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-card">
              <h1 className="font-serif text-3xl text-foreground mb-2">
                Our Wedding Events
              </h1>
              <p className="text-muted-foreground">
                Welcome — here's everything we have planned for the
                celebrations. Tap an event to view more details and photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Events list */}
      <section className="container mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCardClient key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
