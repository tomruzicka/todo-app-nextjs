"use client";

import { ThemeToggle } from "@/app/theme/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components//ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItems } from ".";
import { SidebarButton } from "./SidebarButton";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile({ sidebarItems }: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-3">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] px-3 py-4">
        <SheetTitle>Todo App</SheetTitle>
        <SheetDescription hidden></SheetDescription>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
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
        </div>
        <div className="absolute left-0 bottom-3 w-full px-3">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
