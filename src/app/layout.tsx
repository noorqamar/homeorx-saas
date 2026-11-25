import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#143e2e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Dr. Noor ul Qamar Homeopathy Care | Leading Homeopathy Clinic Lahore & Online",
    template: "%s | Dr. Noor ul Qamar Homeopathy Care",
  },
  description:
    "Consult Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of experience. Thoughtful, individualised homeopathic care for women's health, skin, hair, chronic allergies, and digestive wellness in Lahore and worldwide online.",
  keywords: [
    "Homeopathy Doctor in Lahore",
    "Online Homeopathy Consultation Pakistan",
    "Dr. Noor ul Qamar",
    "Homeopathy Clinic LDA Avenue Lahore",
    "Women's Health Homeopathy Lahore",
    "PCOS Homeopathy Lahore",
    "Hair Fall Homeopathy Lahore",
    "Skin Disease Homeopathic Doctor Lahore",
  ],
  authors: [{ name: "Dr. Noor ul Qamar (D.H.M.S, R.H.M.P)" }],
  metadataBase: new URL("https://drnoorulqamarhomeopathy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Noor ul Qamar Homeopathy Care | Clinic in Lahore & Online Consultations",
    description:
      "Patient-centred, gentle, and individualised homeopathic care led by Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of clinical experience.",
    url: "https://drnoorulqamarhomeopathy.com",
    siteName: "Dr. Noor ul Qamar Homeopathy Care",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Noor ul Qamar Homeopathy Care | Lahore & Online Consultations",
    description:
      "Thoughtful, individualised homeopathic care for women's health, skin, chronic allergies, and digestive wellness.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable} ${notoNastaliqUrdu.variable}`}
      suppressHydrationWarning
    >
      <body className="h-full bg-[#fcfbf7] text-[#1c2d27] antialiased font-sans selection:bg-forest-100 selection:text-forest-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
