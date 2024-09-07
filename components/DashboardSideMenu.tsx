"use client";

import {
  LayoutDashboard,
  Users2,
  LandPlot,
  Building2,
  Receipt,
} from "lucide-react";
import Link from "next/link";

export default function DashboardSideMenu() {
  return (
    <nav className="mt-6">
      <Link
        className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        href="/dashboard"
      >
        <LayoutDashboard className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
        Overview
      </Link>
      <Link
        className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        href="/dashboard/campaign"
      >
        <LandPlot className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
        Campaign
      </Link>
      <Link
        className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        href="/dashboard/candidates"
      >
        <Users2 className="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400" />
        Candidates
      </Link>
      <Link
        className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        href="/dashboard/political-party"
      >
        <Building2 className="h-5 w-5 mr-3 text-red-600 dark:text-red-400" />
        Political Party
      </Link>
      <Link
        className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        href="/dashboard/billing"
      >
        <Receipt className="h-5 w-5 mr-3 text-yellow-600 dark:text-yellow-400" />
        Billing
      </Link>
    </nav>
  );
}
