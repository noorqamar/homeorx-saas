import type { Metadata, Viewport } from "next";
import { Manrope, DM_Serif_Display, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
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
    default: "Doctor | Dr. Noor ul Qamar Homeopathy Care — Leading Homeopathic Doctor in Lahore & Online",
    template: "%s | Doctor Dr. Noor ul Qamar Homeopathy Care",
  },
  description:
    "Consult Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of experience. Thoughtful, individualised homeopathic care for women's health, PCOS, fertility, skin, hair loss, chronic allergies, and digestive wellness in Lahore and worldwide online.",
  applicationName: "Dr. Noor ul Qamar Homeopathy Care",
  keywords: [
    "Doctor",
    "Dr. Noor ul Qamar",
    "Dr Noorul Qamar",
    "Doctor Noor ul Qamar",
    "Doctor in Lahore",
    "Homeopathic Doctor in Lahore",
    "Homeopathy Doctor Lahore",
    "Best Homeopathic Doctor in Lahore",
    "Best Homeopath in Pakistan",
    "Homeopathic Doctor Pakistan",
    "Online Homeopathy Consultation Pakistan",
    "Homeopathy Clinic LDA Avenue 1 Lahore",
    "Women's Health Homeopathy Doctor",
    "PCOS Homeopathy Specialist Lahore",
    "Hair Loss Homeopathic Treatment Lahore",
    "Skin Disease Homeopathic Doctor Lahore",
    "Dr. Noor ul Qamar Homeopath",
    "Top Homeopathic Doctors Pakistan",
    "Registered Homeopathic Medical Practitioner",
    "D.H.M.S, R.H.M.P Doctor Lahore",
    "Natural Clinical Wellness Pakistan",
  ],
  authors: [{ name: "Dr. Noor ul Qamar, D.H.M.S, R.H.M.P", url: "https://dr.noorulqamar.com/about" }],
  creator: "Dr. Noor ul Qamar",
  publisher: "Dr. Noor ul Qamar Homeopathy Care",
  category: "Medical & Health",
  classification: "Homeopathic Medicine & Clinical Healthcare",
  metadataBase: new URL("https://dr.noorulqamar.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-PK": "https://dr.noorulqamar.com/",
      "ur-PK": "https://dr.noorulqamar.com/",
      "x-default": "https://dr.noorulqamar.com/",
    },
  },
  openGraph: {
    title: "Doctor | Dr. Noor ul Qamar Homeopathy Care — Clinic in Lahore & Online",
    description:
      "Patient-centred, gentle, and individualised homeopathic care led by Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of clinical experience. Specialising in women's health, skin, hair, and digestive wellness.",
    url: "https://dr.noorulqamar.com",
    siteName: "Dr. Noor ul Qamar Homeopathy Care",
    locale: "en_PK",
    alternateLocale: ["en_GB", "ur_PK"],
    type: "website",
    images: [
      {
        url: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
        width: 926,
        height: 1024,
        alt: "Dr. Noor ul Qamar, D.H.M.S, R.H.M.P — Consultant Homeopathic Doctor in Lahore",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctor | Dr. Noor ul Qamar Homeopathy Care — Lahore & Online",
    description:
      "Thoughtful, individualised homeopathic care for women's health, PCOS, skin, hair, chronic allergies, and digestive wellness by Dr. Noor ul Qamar (D.H.M.S, R.H.M.P).",
    images: [
      {
        url: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
        alt: "Dr. Noor ul Qamar, D.H.M.S, R.H.M.P — Consultant Homeopathic Doctor in Lahore",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "PK-PB",
    "geo.placename": "Lahore",
    "geo.position": "31.370597;74.195612",
    "ICBM": "31.370597, 74.195612",
    "format-detection": "telephone=yes, address=yes, email=no",
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "2 days",
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
      className={`h-full scroll-smooth ${manrope.variable} ${dmSerifDisplay.variable} ${notoNastaliqUrdu.variable}`}
      suppressHydrationWarning
    >
      <body className="h-full bg-[#fcfbf7] text-[#1c2d27] antialiased font-sans selection:bg-forest-100 selection:text-forest-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
