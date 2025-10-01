import type React from "react";

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

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
