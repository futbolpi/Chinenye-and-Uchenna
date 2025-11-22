// biome-ignore-all lint/a11y/useSemanticElements: needed for framer motion animation

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Props:
 * images: { src: string; alt?: string; caption?: string }[]
 */
export default function EventGalleryClient({
  images,
}: {
  images: { src: string; alt?: string; caption?: string }[];
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {images.map((img, i) => (
          <motion.div
            key={`${img.src}${i}`}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-lg overflow-hidden shadow-sm bg-card"
            onClick={() => setSelected(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelected(i);
            }}
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt ?? `gallery-${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>

            {img.caption && (
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1 rounded-md bg-[color:var(--color-muted)]/70 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground truncate">
                  {/* {img.caption} */}Gallery
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selected !== null && images[selected] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full mx-auto rounded-2xl overflow-hidden shadow-2xl bg-card"
            >
              <div className="relative w-full aspect-[3/2] bg-muted">
                <Image
                  src={images[selected].src}
                  alt={images[selected].alt ?? `image-${selected}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {`Photo ${selected + 1}`}
                    {/* {images[selected].caption ?? `Photo ${selected + 1}`} */}
                  </h3>
                  {images[selected].alt && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {images[selected].alt}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelected((s) =>
                        s === null
                          ? null
                          : (s - 1 + images.length) % images.length,
                      )
                    }
                  >
                    Prev
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelected((s) =>
                        s === null ? null : (s + 1) % images.length,
                      )
                    }
                  >
                    Next
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelected(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* gentle CTA */}
      <div className="text-center pt-4">
        <Badge className="bg-primary text-primary-foreground">
          Cherish these moments
        </Badge>
      </div>
    </div>
  );
}
