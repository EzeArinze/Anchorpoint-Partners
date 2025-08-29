"use client";

import * as React from "react";
import {
  IconDashboard,
  // IconSettings,
  IconUser,
  IconCashBanknoteEdit,
  IconList,
  IconMoneybag,
} from "@tabler/icons-react";

import { NavMain } from "@/app/dashboard/_components/sidebar/nav-main";
// import { NavSecondary } from "@/app/dashboard/_components/sidebar/nav-secondary";
import { NavUser } from "@/app/dashboard/_components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { clientSession } from "@/hooks/client-session";
import { UserSkeleton } from "@/components/user-skeleton";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Deposits",
      url: "/admin/deposits",
      icon: IconMoneybag,
    },
    {
      title: "Withdrawal requests",
      url: "/admin/withdrawal-request",
      icon: IconCashBanknoteEdit,
    },
    {
      title: "Investment",
      url: "/admin/investments",
      icon: IconList,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUser,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "/dashboard/settings",
  //     icon: IconSettings,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { email, image, name, isPending } = clientSession();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="mb-3">
              <Logo href="/admin" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <UserSkeleton />
        ) : (
          <NavUser user={{ email, name, image }} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
