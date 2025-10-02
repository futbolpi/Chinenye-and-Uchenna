import { Heart, MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

const Footer = () => {
  const whatsappHref = `https://wa.me/${siteConfig.dev.whatsapp.replace(
    /[^0-9+]/g,
    "",
  )}`;

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg text-foreground">
            {siteConfig.name}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          With love and gratitude for your presence in our lives
        </p>
        <div className="flex items-center justify-center space-x-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-primary hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact Developer on WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
