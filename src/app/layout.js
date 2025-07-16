import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load Geist Sans font with CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono font with CSS variable
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the application (updated as per repo name)
export const metadata = {
  title: "NextJS Bulk Emailer",
  description: "Bulk email sender app built with Next.js",
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render all child components/pages */}
        {children}
      </body>
    </html>
  );
}
