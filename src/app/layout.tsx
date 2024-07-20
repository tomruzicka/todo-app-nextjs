import { Dialog } from "@/components/Dialog";
import { DialogProvider } from "@/components/Dialog/DialogProvider";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const fontFamily = Quicksand({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontFamily.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DialogProvider>
            <div className="flex">
              <Sidebar />
              {children}
              <Toaster />
              <Dialog />
            </div>
          </DialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
