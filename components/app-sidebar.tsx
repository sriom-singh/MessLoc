import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"


import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

import {
  BadgePercent,
  BarChart3,
  Bell,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Settings,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export const navigation = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Messes",
        href: "/dashboard/messes",
        icon: UtensilsCrossed,
      },
      {
        title: "Bookings",
        href: "/dashboard/bookings",
        icon: CalendarCheck,
      },
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Reviews",
        href: "/dashboard/reviews",
        icon: Star,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Locations",
        href: "/dashboard/locations",
        icon: MapPinned,
      },
      {
        title: "Coupons",
        href: "/dashboard/coupons",
        icon: BadgePercent,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Logout",
        href: "/logout",
        icon: LogOut,
      },
    ],
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  className="bg-transparent" {...props}>
      <SidebarHeader className="my-2 px-4">
        {/* <SearchForm /> */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logosmall.svg"
            alt="Logo"
            width={30}
            height={30}
            className="mr-2 w-6 h-6 md:w-8 md:h-8"
          />

          <h1 className="text-md md:text-xl font-semibold whitespace-nowrap">
            MessLoc
          </h1>
        </Link>
      <Separator/>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 ">
        {navigation.map((item) => (
          <SidebarGroup key={item.label}>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem  key={item.title}>
                    <SidebarMenuButton className="hover:bg-primary/50"
                      render={<Link href={item.href} />}
                    >
                      <item.icon className="mr-2 h-4 w-4" /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
