import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { events } from "@/lib/events";
import EventCardClient from "./_components/event-card-client";
import { VideoCarousel } from "./_components/video-carousel";

export const metadata: Metadata = {
  title: `Events — ${siteConfig.name}`,
  description:
    "Wedding events — join us for the traditional, church service, and reception.",
};

export default function EventsPage() {
  return (
    <div className="bg-background text-foreground p-4 mt-8">
      {/* Hero Video Carousel */}
      <section className="container mx-auto py-8">
        <VideoCarousel />
      </section>

      <Separator className="my-8" />

      {/* Events list */}
      <section className="container mx-auto py-6">
        <h2 className="font-serif text-2xl text-center mb-8">Event Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCardClient key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
