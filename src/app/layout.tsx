import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`h-full ${plusJakartaSans.variable} ${notoNastaliqUrdu.variable}`}
      suppressHydrationWarning
    >
      <body className="h-full bg-[#F4F7FC] text-[#2B3674] antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
