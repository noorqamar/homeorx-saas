import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeoRx — Modern Homeopathic Prescription & Patient Management SaaS",
  description:
    "Professional, secure, multi-tenant clinical documentation and prescription software for Homeopathic Doctors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-slate-50 antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
