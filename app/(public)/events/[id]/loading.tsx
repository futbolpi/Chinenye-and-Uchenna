import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto py-12">
      <Card className="animate-pulse">
        <CardContent className="h-64 flex flex-col items-center justify-center">
          <div className="h-4 w-56 bg-muted rounded-md mb-4" />
          <div className="h-3 w-40 bg-muted rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
