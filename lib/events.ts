// lib/events.ts
export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO or friendly date string
  time?: string;
  venue?: string;
  summary?: string;
  cover?: string; // local path in /public/images or remote url
  images?: { src: string; alt?: string; caption?: string }[];
  tags?: string[]; // e.g., ['Traditional', 'Reception']
};

export const events: EventItem[] = [
  {
    id: "traditional-ceremony",
    title: "Traditional Wedding",
    date: "2026-03-06",
    time: "11:00 AM",
    venue: "Bride's Family Compound, Lagos",
    summary:
      "A colorful celebration honoring family traditions with prayers, music, and dance. Traditional attire recommended.",
    cover: "/images/events/trad/1.png",
    images: [
      {
        src: "/images/events/trad/1.png",
        alt: "Traditional rites",
        caption: "Blessings & libation",
      },
      {
        src: "/images/events/trad/1.png",
        alt: "Family photo",
        caption: "Family circle",
      },
    ],
    tags: ["Traditional", "Ceremony"],
  },
  {
    id: "church-wedding",
    title: "Church Service (White Wedding)",
    date: "2026-03-07",
    time: "9:00 AM",
    venue: "St. Mary’s Cathedral, Lekki",
    summary:
      "A solemn service of vows and prayers, followed by a short reception at the church hall. Formal attire (white recommended).",
    cover: "/images/events/court/1.jpg",
    images: [
      {
        src: "/images/events/court/1.jpg",
        alt: "Church ceremony",
        caption: "Vows & rings",
      },
      {
        src: "/images/events/white/1.png",
        alt: "Couple exit",
        caption: "Recessional",
      },
    ],
    tags: ["Church", "Ceremony"],
  },
  {
    id: "reception",
    title: "Reception & Party",
    date: "2026-03-07",
    time: "6:00 PM",
    venue: "The Grand Banquet Hall, Victoria Island",
    summary:
      "An evening of dining, toasts, and music — join us for a joyful celebration of the new couple. Cocktail attire.",
    cover: "/images/events/reception/1.png",
    images: [
      {
        src: "/images/events/reception/1.png",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/1.png",
        alt: "Dance floor",
        caption: "First dance",
      },
    ],
    tags: ["Reception", "Party"],
  },
];
