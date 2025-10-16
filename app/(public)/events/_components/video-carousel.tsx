"use client";

import Video from "next-video";
import type { Asset } from "next-video/dist/assets.js";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import video1 from "@/videos/video1.mp4";
import video2 from "@/videos/video2.mp4";

// Define a type for your video data
export interface HeroVideo {
  id: number;
  src: Asset;
  title: string;
  description: string;
}

const videos: HeroVideo[] = [
  {
    description:
      "Welcome! Here's everything we have planned for the celebrations.",
    id: 1,
    src: video1,
    title: "Our Wedding Events",
  },
  {
    description: "Some of our favorite moments leading up to the big day.",
    id: 2,
    src: video2,
    title: "A Look Back",
  },
];

export function VideoCarousel() {
  return (
    <Carousel className="w-full group">
      <CarouselContent>
        {videos.map((video) => (
          <CarouselItem key={video.id}>
            <div className="p-1">
              <Card className="overflow-hidden border border-border shadow-sm">
                <div className="w-full aspect-video bg-black">
                  <Video
                    src={video.src}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 bg-card">
                  <h1 className="font-serif text-3xl text-foreground mb-2">
                    {video.title}
                  </h1>
                  <p className="text-muted-foreground">{video.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Add subtle controls that appear on hover */}
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Carousel>
  );
}
