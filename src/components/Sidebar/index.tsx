"use client";

import { useMediaQuery } from "@/theme/useMediaQuery";
import { Home, LucideIcon, SquareCheckBig } from "lucide-react";
import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarMobile } from "./SidebarMobile";

export interface SidebarItems {
  links: {
    label: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "/", icon: Home },
    { label: "My Todos", href: "/todos", icon: SquareCheckBig },
  ],
};

export const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile) return <SidebarMobile sidebarItems={sidebarItems} />;
  return <SidebarDesktop sidebarItems={sidebarItems} />;
};
