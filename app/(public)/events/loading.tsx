import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto py-20">
      <Card className="animate-pulse">
        <CardContent className="h-48 flex items-center justify-center">
          <div className="text-muted-foreground">Loading events…</div>
        </CardContent>
      </Card>
    </div>
  );
}
