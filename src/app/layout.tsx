import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Node-Flow",
  description: "n8n clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <TRPCReactProvider>
          <ThemeProvider attribute="class">
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
