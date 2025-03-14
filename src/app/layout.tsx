import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./CustomComponents/Navbar";
import Sidebar from "./CustomComponents/Sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "./CustomComponents/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Univillage",
  description:
    "Connect, share, and discover in a fun, vibrant community. Stay updated with your friends, express yourself, and explore endless content—all in one place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                {/* container to center the content */}
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Responsive sidebar - always shown but with different widths */}
                    <div className="md:col-span-3 lg:col-span-2 xl:col-span-2">
                      <div className="sticky top-20">
                        <Sidebar />
                      </div>
                    </div>
                    {/* Main content area - takes more space on larger screens */}
                    <div className="md:col-span-9 lg:col-span-10 xl:col-span-10">
                      {children}
                    </div>
                  </div>
                </div>
              </main>

              <Footer />
            </div>

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
