"use client";

import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/messes": "Messes",
  "/dashboard/messes/new": "Add New Mess",
  "/dashboard/bookings": "Bookings",
  "/dashboard/users": "Users",
  "/dashboard/reviews": "Reviews",
  "/dashboard/locations": "Locations",
  "/dashboard/coupons": "Coupons",
  "/dashboard/notifications": "Notifications",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

export default function PageHeader() {
  const pathname = usePathname();

  const title =
    routeTitles[pathname] ??
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ??
    "Dashboard";

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-medium">{title}</h1>

    </div>
  );
}