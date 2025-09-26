"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { completeOnboarding } from "@/actions/complete-onboarding";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleOnboarding = async () => {
      const res = await completeOnboarding();
      if (res?.message) {
        // Reloads the user's data from the Clerk API
        await user?.reload();
        router.push("/");
      }
      if (res?.error) {
        toast.error(res.error);
      }
    };

    handleOnboarding();
  }, []);

  return <div>Loading...</div>;
}
