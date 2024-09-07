"use client";

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DashboardNavBar from "@/components/DashboardNavBar";
import DashboardSideMenu from "@/components/DashboardSideMenu";
import Link from "next/link";

type DashboardLayoutProps = {} & React.PropsWithChildren<{}>;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const session = useAppSelector((state) => state.auth.session);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <Link href="/">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h2>
          </Link>
        </div>
        <DashboardSideMenu />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <DashboardNavBar />

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
