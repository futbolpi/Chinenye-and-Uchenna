import type React from "react";
import { Heart } from "lucide-react";

import { siteConfig } from "@/config/site";
import Navbar from "./_components/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg text-foreground">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            With love and gratitude for your presence in our lives
          </p>
        </div>
      </footer>
    </div>
  );
}
