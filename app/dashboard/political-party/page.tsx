"use client";

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PoliticalPartyManagement from "@/components/PoliticalPartyManagement";

export default function Page() {
  const router = useRouter();
  const session = useAppSelector((state) => state.auth.session);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayout>
        <PoliticalPartyManagement />
      </DashboardLayout>
    </Suspense>
  );
}
