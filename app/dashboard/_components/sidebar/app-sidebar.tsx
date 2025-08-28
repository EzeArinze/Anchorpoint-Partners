"use client";

import * as React from "react";
import {
  IconDashboard,
  IconCashBanknote,
  IconSettings,
  IconUser,
  IconTransactionBitcoin,
  IconCashBanknoteEdit,
  IconList,
} from "@tabler/icons-react";

import { NavMain } from "@/app/dashboard/_components/sidebar/nav-main";
import { NavSecondary } from "@/app/dashboard/_components/sidebar/nav-secondary";
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
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Deposit",
      url: "/dashboard/deposit",
      icon: IconCashBanknoteEdit,
    },
    {
      title: "Investment Plans",
      url: "/dashboard/investment-plans",
      icon: IconList,
    },
    {
      title: "Withdrawals",
      url: "/dashboard/withdraw",
      icon: IconCashBanknote,
    },
    {
      title: "Refferals",
      url: "/dashboard/refferals",
      icon: IconUser,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: IconTransactionBitcoin,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { email, image, name, isPending } = clientSession();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="mb-3">
              <Logo href="/dashboard" height={50} width={130} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
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
