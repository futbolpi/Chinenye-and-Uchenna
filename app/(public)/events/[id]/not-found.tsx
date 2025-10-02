import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="container mx-auto py-20">
      <Card className="text-center bg-card">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Event not found</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-muted-foreground mb-6">
            We couldn't find that event. It may have been removed or the link is
            incorrect.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/events">
              <Button>Back to events</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Return home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
