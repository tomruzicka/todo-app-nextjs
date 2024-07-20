"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components//ui/sheet";
import { useDialog } from "@/components/Dialog/DialogProvider";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { FilePlus, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarItems } from ".";
import { SidebarButton } from "./SidebarButton";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export const SidebarMobile = ({ sidebarItems }: SidebarMobileProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openDialog } = useDialog();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" className="m-1">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] px-3 py-4">
        <SheetTitle>Todo App</SheetTitle>
        <SheetDescription hidden></SheetDescription>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            <Button
              className="mb-4"
              onClick={() => {
                openDialog("add");
                setOpen(false);
              }}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>

            {sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href} onClick={() => setOpen(false)}>
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
};
