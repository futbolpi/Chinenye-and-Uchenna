import type React from "react";

import Footer from "./_components/footer";
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
      <Footer />
    </div>
  );
}
