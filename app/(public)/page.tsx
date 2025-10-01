import Rsvp from "./_components/rsvp";
import OurStory from "./_components/our-story";
import WeddingDetails from "./_components/wedding-details";
import Hero from "./_components/hero";

export default function WeddingHomePage() {
  return (
    <div className="min-h-screen mt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-secondary/20" />

        <Hero />
      </section>

      {/* Wedding Details Cards */}
      <section id="details" className="py-20 px-6">
        <WeddingDetails />
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <OurStory />
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <Rsvp />
        </div>
      </section>
    </div>
  );
}
