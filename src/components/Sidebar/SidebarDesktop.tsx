"use client";

import { ThemeToggle } from "@/app/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItems } from ".";
import { useDialog } from "../Dialog/DialogProvider";
import { SidebarButton } from "./SidebarButton";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export const SidebarDesktop = ({ sidebarItems }: SidebarDesktopProps) => {
  const pathname = usePathname();
  const { openDialog } = useDialog();

  return (
    <div className="w-[250px] max-w-xs h-screen left-0 top-0 z-40 border-r bg-background">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">Todo App</h3>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            <Button className="mb-4" onClick={() => openDialog("add")}>
              <FilePlus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
            {sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  icon={link.icon}
                  className="w-full"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute left-0 bottom-3 w-full px-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
