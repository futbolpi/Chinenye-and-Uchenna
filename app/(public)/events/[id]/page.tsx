import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { events } from "@/lib/events";
import EventGalleryClient from "./components/event-gallery-client";

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id: eventId } = await params;

  const event = events.find((e) => e.id === eventId);

  if (!event) return { title: "Event not found" };

  return {
    title: `${event.title} — Events`,
    description: event.summary ?? `Details for ${event.title}`,
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    openGraph: {
      title: `${event.title} — Events`,
      description: event.summary,
      images: event.cover ? [{ url: event.cover }] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: Params) {
  const { id: eventId } = await params;

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">
                {event.title}
              </CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {event.time && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    {event.time}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="prose text-muted-foreground">{event.summary}</p>

              <div className="space-y-1">
                <h4 className="text-sm text-muted-foreground">Venue</h4>
                <p className="text-sm text-foreground blur-sm">
                  {event.venue ?? "TBA"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(event.tags ?? []).map((t) => (
                  <Badge key={t} className="bg-accent text-accent-foreground">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="pt-3 flex gap-3">
                <Link href="/events" className="inline-block">
                  <Button variant="secondary" size="sm">
                    Back to events
                  </Button>
                </Link>
                <a href="#gallery" className="inline-block">
                  <Button size="sm">View gallery</Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Small cover preview */}
          {event.cover && (
            <Card className="overflow-hidden">
              <div className="relative w-full h-56 bg-muted">
                <Image
                  src={event.cover}
                  alt={`${event.title} cover`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          )}
        </div>

        {/* Right / Gallery */}
        <div className="lg:col-span-2">
          <div id="gallery">
            <h2 className="font-serif text-2xl mb-3">
              {event.title} — Gallery
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tap any image to enlarge. Moments captured from the celebration.
            </p>

            <EventGalleryClient images={event.images ?? []} />
          </div>

          <Separator className="my-8" />

          <div className="text-sm text-muted-foreground">
            <p>
              If you need directions to the venue, the address is only revealed
              via the invite QR. See your invite for the QR or contact the
              hosts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
