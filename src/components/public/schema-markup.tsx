import { CLINIC_INFO } from "@/data/clinic-info";

interface SchemaMarkupProps {
  type?: "clinic" | "faq" | "blog" | "treatment";
  faqItems?: { question: string; answer: string }[];
  blogData?: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
  treatmentData?: {
    title: string;
    description: string;
    category: string;
    slug: string;
  };
}

export function SchemaMarkup({
  type = "clinic",
  faqItems,
  blogData,
  treatmentData,
}: SchemaMarkupProps) {
  // 1. LocalBusiness / Physician / MedicalClinic schema
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician", "LocalBusiness"],
    "@id": "https://drnoorulqamarhomeopathy.com/#clinic",
    name: CLINIC_INFO.brandName,
    alternateName: "Dr. Noor ul Qamar Clinic",
    description:
      "Specialised homeopathic medical practice led by Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years experience. In-clinic consultations in Lahore and online consultations worldwide.",
    url: "https://drnoorulqamarhomeopathy.com",
    telephone: CLINIC_INFO.phoneFormatted,
    priceRange: "PKR 1500 - 2500",
    image: "https://drnoorulqamarhomeopathy.com/doctor-portrait.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Noor Street, LDA Avenue 1",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "31.370597",
      longitude: "74.195612",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "18:00",
        closes: "22:00",
      },
    ],
    medicalSpecialty: "Homeopathic",
    founder: {
      "@type": "Person",
      name: CLINIC_INFO.doctorName,
      jobTitle: "Consultant Homeopathic Physician",
      honorificSuffix: CLINIC_INFO.qualifications,
      description:
        "Homeopathic doctor with 10 years of clinical experience specializing in women's health, skin diseases, allergies, and digestive wellness.",
    },
  };

  // 2. FAQPage Schema
  let faqSchema: object | null = null;
  if (faqItems && faqItems.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  // 3. BlogPosting Schema
  let blogPostingSchema: object | null = null;
  if (blogData) {
    blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogData.title,
      description: blogData.description,
      datePublished: blogData.date,
      dateModified: blogData.date,
      author: {
        "@type": "Person",
        name: CLINIC_INFO.doctorName,
        jobTitle: "Consultant Homeopath",
      },
      publisher: {
        "@type": "Organization",
        name: CLINIC_INFO.brandName,
        url: "https://drnoorulqamarhomeopathy.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://drnoorulqamarhomeopathy.com/blog/${blogData.slug}`,
      },
    };
  }

  // 4. MedicalCondition / MedicalWebPage Schema
  let treatmentSchema: object | null = null;
  if (treatmentData) {
    treatmentSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: `${treatmentData.title} Homeopathic Care | Dr. Noor ul Qamar`,
      description: treatmentData.description,
      about: {
        "@type": "MedicalCondition",
        name: treatmentData.title,
        possibleTreatment: [
          {
            "@type": "MedicalTherapy",
            name: "Individualised Constitutional Homeopathy",
          },
        ],
      },
      reviewedBy: {
        "@type": "Person",
        name: CLINIC_INFO.doctorName,
        jobTitle: "Consultant Homeopath (D.H.M.S, R.H.M.P)",
      },
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {treatmentSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentSchema) }}
        />
      )}
    </>
  );
}
