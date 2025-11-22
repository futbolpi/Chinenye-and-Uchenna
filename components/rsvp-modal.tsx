"use client";

import { MessageSquare, Phone, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { siteConfig } from "@/config/site";

type RsvpModalProps = {
  trigger?: ReactNode; // optional custom trigger (Credenza trigger child)
  className?: string;
};

/**
 * RsvpModal
 * - Uses Credenza (Dialog on desktop / Drawer on mobile)
 * - Renders a list of contacts with Call + WhatsApp actions
 * - Accepts an optional `trigger` prop (rendered inside CredenzaTrigger)
 * - Visual styling uses shadcn CSS variables (no Tailwind color utilities)
 */
export default function RsvpModal({ trigger, className }: RsvpModalProps) {
  const sanitize = (n?: string) => (n || "").replace(/\\D/g, "");

  const onCall = (number?: string) => {
    const tel = `tel:${sanitize(number)}`;
    // navigate to tel: URI to initiate a call on mobile / prompt on desktop apps
    window.open(tel, "_self");
  };

  const onWhatsApp = (number?: string, name?: string) => {
    const clean = sanitize(number);
    if (!clean) return;
    const text = encodeURIComponent(
      `Hi ${name || "there"}, I would like to RSVP for ${
        siteConfig.name
      } wedding.`,
    );
    const wa = `https://wa.me/${clean}?text=${text}`;
    window.open(wa, "_blank");
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="px-3">
            RSVP
          </Button>
        )}
      </CredenzaTrigger>

      <CredenzaContent className={className}>
        <div
          style={{
            padding: 16,
            background: "var(--card)",
            color: "var(--foreground)",
            minWidth: 300,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <CredenzaHeader>
              <CredenzaTitle> RSVP & Contacts</CredenzaTitle>
              <CredenzaDescription>
                Contact someone below to RSVP or ask questions.
              </CredenzaDescription>
            </CredenzaHeader>

            <CredenzaClose asChild>
              <Button
                aria-label="Close"
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 8,
                }}
                size={"icon"}
              >
                <X />
              </Button>
            </CredenzaClose>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            {siteConfig.rsvp.map((c) => (
              <div
                key={c.phone}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  background: "var(--muted)",
                  boxShadow: "inset 0 0 0 1px var(--ring)",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--foreground)",
                      fontSize: 14,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--muted-foreground)",
                      marginTop: 4,
                    }}
                  >
                    {c.phone}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onCall(c.phone)}
                    aria-label={`Call ${c.name}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span style={{ marginLeft: 8, fontSize: 13 }}>Call</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onWhatsApp(c.whatsappNumber, c.name)}
                    aria-label={`WhatsApp ${c.name}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span style={{ marginLeft: 8, fontSize: 13 }}>
                      WhatsApp
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CredenzaClose asChild>
              <Button size="sm">Done</Button>
            </CredenzaClose>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
