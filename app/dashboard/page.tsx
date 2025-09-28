import { StaffDashboard } from "./_components/staff-dashboard";
import { getAllInvites } from "./services";

export default async function StaffPage() {
  const invites = await getAllInvites();

  return (
    <div className="min-h-screen bg-background">
      <StaffDashboard initialInvites={invites} />
    </div>
  );
}
