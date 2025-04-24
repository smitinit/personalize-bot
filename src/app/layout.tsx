import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Personalise Bot",
  description: "Dashboard for Personalise Bot",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
