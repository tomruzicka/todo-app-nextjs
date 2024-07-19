"use client";

import { useMediaQuery } from "@/app/theme/useMediaQuery";
import {
  CalendarCheck,
  ListChecks,
  LucideIcon,
  SquareCheckBig,
} from "lucide-react";
import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarMobile } from "./SidebarMobile";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
}

const sidebarItems: SidebarItems = {
  links: [
    { label: "Today", href: "/", icon: CalendarCheck },
    { label: "All todos", href: "/todos", icon: SquareCheckBig },
    { label: "My lists", href: "/lists", icon: ListChecks },
  ],
};

export function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile) return <SidebarMobile sidebarItems={sidebarItems} />;

  return <SidebarDesktop sidebarItems={sidebarItems} />;
}
