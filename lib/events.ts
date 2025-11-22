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
    date: "2024-12-07", // Suggested date: day before the Church Service
    time: "12:00 PM",
    venue: "Bride's Family Compound",
    summary:
      "A beautiful, colorful, and joyous celebration of culture and family union. Traditional attire is highly recommended.",
    cover: "/images/events/trad/6.jpg",
    images: [
      {
        src: "/images/events/trad/1.jpg",
        alt: "The couple in traditional Igbo attire (Isi Agu and George fabric).",
        caption: "Nwaanyị Mma Mma! The Couple.",
      },
      {
        src: "/images/events/trad/2.jpg",
        alt: "The bride performing the Igbankwu rite, searching for the groom with palm wine.",
        caption: "Iwa Aku (The Wine Carrying Ceremony).",
      },
      {
        src: "/images/events/trad/3.jpg",
        alt: "The couple being blessed by their parents/elders.",
        caption: "Blessings from the Elders.",
      },
      {
        src: "/images/events/trad/4.jpg",
        alt: "A dance performance with Igbo music.",
        caption: "Joyful Dance and Celebration.",
      },
      {
        src: "/images/events/trad/5.jpg",
        alt: "A picture of the traditional decor, perhaps kola nuts and palm wine.",
        caption: "Traditional Rites and Symbols.",
      },
      {
        src: "/images/events/trad/6.jpg",
        alt: "The bride throwing the bouquet.",
        caption: "A joyful moment.",
      },
      {
        src: "/images/events/trad/7.jpg",
        alt: "A picture of the couple cutting a traditional wedding cake or meal.",
        caption: "Sharing the Meal.",
      },
      {
        src: "/images/events/trad/8.jpg",
        alt: "Close-up of the couple's traditional wedding rings or hands.",
        caption: "A promise of Forever.",
      },
      {
        src: "/images/events/trad/9.jpg",
        alt: "Picture of the groom's family presenting gifts.",
        caption: "Presenting Dowry (Ego Ngọzị).",
      },
      {
        src: "/images/events/trad/10.jpg",
        alt: "A group photo of the bridal train/friends in uniform traditional attire.",
        caption: "The Asoebi Crew.",
      },
      {
        src: "/images/events/trad/11.jpg",
        alt: "A picture of the bride with her parents.",
        caption: "Farewell from Papa and Mama.",
      },
      {
        src: "/images/events/trad/12.jpg",
        alt: "A vibrant picture of traditional drummers or musicians.",
        caption: "Music and Celebration.",
      },
    ],
    tags: ["Traditional", "Igbankwu"],
  },
  {
    id: "church-wedding",
    title: "Church Service",
    date: "2025-11-22",
    time: "10:00 AM",
    venue: "Church of the Assumption Parish",
    summary:
      "A solemn service of vows and prayers, followed by a short reception at the church hall. Formal attire (white recommended).",
    cover: "/images/events/white/3.jpg",
    images: [
      {
        src: "/images/events/white/1.jpg",
        alt: "Church ceremony",
        caption: "Gallery",
      },
      {
        src: "/images/events/white/2.jpg",
        alt: "Couple exit",
        caption: "Gallery",
      },
      {
        src: "/images/events/white/3.jpg",
        alt: "Couple exit",
        caption: "Gallery",
      },
    ],
    tags: ["Church", "Ceremony"],
  },
  {
    id: "reception",
    title: "Reception & Party",
    date: "2025-11-22",
    time: "1:00 PM",
    venue: "Signature Hall by Wells Carlton",
    summary:
      "An evening of dining, toasts, and music — join us for a joyful celebration of the new couple. Cocktail attire.",
    cover: "/images/events/reception/7.jpg",
    images: [
      {
        src: "/images/events/reception/1.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/2.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/3.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/4.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/5.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/6.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/7.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/8.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
      {
        src: "/images/events/reception/9.jpg",
        alt: "Reception table",
        caption: "Table setting",
      },
    ],
    tags: ["Reception", "Party"],
  },
];
