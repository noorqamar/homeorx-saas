import { CLINIC_INFO } from "@/data/clinic-info";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaMarkupProps {
  type?: "clinic" | "faq" | "blog" | "treatment";
  faqItems?: { question: string; answer: string }[];
  breadcrumbs?: BreadcrumbItem[];
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
  breadcrumbs,
  blogData,
  treatmentData,
}: SchemaMarkupProps) {
  // 1. Google Sitelinks SearchBox WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dr.noorulqamar.com/#website",
    url: "https://dr.noorulqamar.com",
    name: "Dr. Noor ul Qamar Homeopathy Care",
    alternateName: ["Dr. Noor ul Qamar", "Doctor Noor ul Qamar Homeopathy Clinic Lahore"],
    description: "Official portal of Dr. Noor ul Qamar, leading homeopathic doctor in Lahore, Pakistan.",
    publisher: {
      "@id": "https://dr.noorulqamar.com/#physician",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dr.noorulqamar.com/treatments?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // 2. High-Authority Physician & MedicalClinic LocalBusiness Schema
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician", "LocalBusiness", "MedicalOrganization"],
    "@id": "https://dr.noorulqamar.com/#clinic",
    name: CLINIC_INFO.brandName,
    alternateName: [
      "Dr. Noor ul Qamar",
      "Doctor Noor ul Qamar",
      "Dr Noorul Qamar Clinic",
      "Dr. Noor ul Qamar Homeopathic Doctor Lahore",
      "Noor Homeopathy Clinic LDA Avenue 1",
    ],
    description:
      "Specialised homeopathic clinical medical practice led by Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of clinical experience. Providing individualised constitutional care for women's health, PCOS, skin, hair, chronic allergies, and digestive wellness in Lahore and worldwide online.",
    url: "https://dr.noorulqamar.com",
    telephone: CLINIC_INFO.phoneFormatted,
    priceRange: "PKR 1500 - 2500",
    currenciesAccepted: "PKR, USD, GBP, AED, SAR, EUR",
    paymentAccepted: "Cash, Bank Transfer, EasyPaisa, JazzCash, Raast",
    isAcceptingNewPatients: true,
    medicalSpecialty: [
      "Homeopathic",
      "Holistic",
      "ComplementaryAndAlternativeMedicine",
    ],
    image: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
    logo: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Noor Street, LDA Avenue 1",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      postalCode: "54000",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    founder: {
      "@type": "Person",
      "@id": "https://dr.noorulqamar.com/#physician",
      name: CLINIC_INFO.doctorName,
      givenName: "Noor ul Qamar",
      honorificPrefix: "Dr.",
      honorificSuffix: CLINIC_INFO.qualifications,
      jobTitle: "Consultant Homeopathic Physician",
      description:
        "Registered Homeopathic Medical Practitioner (R.H.M.P) with 10 years of clinical experience specializing in women's health, PCOS, dermatology, chronic allergies, and constitutional healing.",
      telephone: CLINIC_INFO.phoneFormatted,
      image: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
      worksFor: {
        "@id": "https://dr.noorulqamar.com/#clinic",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "National Council for Homeopathy Pakistan",
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional Degree",
          name: "Diploma in Homeopathic Medical System (D.H.M.S)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Medical License",
          name: "Registered Homeopathic Medical Practitioner (R.H.M.P)",
        },
      ],
      knowsAbout: [
        "Homeopathy",
        "Women's Hormonal Health",
        "PCOS & Fertility Guidance",
        "Dermatology & Skin Disorders",
        "Alopecia & Hair Loss Treatments",
        "Chronic Gastrointestinal & Liver Disorders",
        "Constitutional Homeopathic Prescriptions",
      ],
    },
  };

  // 3. BreadcrumbList Schema for Google SERP Navigation
  let breadcrumbSchema: object | null = null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith("http")
          ? crumb.url
          : `https://dr.noorulqamar.com${crumb.url}`,
      })),
    };
  }

  // 4. FAQPage Schema
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

  // 5. BlogPosting Schema
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
        jobTitle: "Consultant Homeopath (D.H.M.S, R.H.M.P)",
        url: "https://dr.noorulqamar.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: CLINIC_INFO.brandName,
        url: "https://dr.noorulqamar.com",
        logo: {
          "@type": "ImageObject",
          url: "https://dr.noorulqamar.com/images/dr-noorul-qamar.jpg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://dr.noorulqamar.com/blog/${blogData.slug}`,
      },
    };
  }

  // 6. MedicalCondition / MedicalWebPage Schema
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
            description:
              "Holistic homeopathic supportive care customized according to individual patient constitution and etiology.",
          },
        ],
      },
      reviewedBy: {
        "@type": "Person",
        name: CLINIC_INFO.doctorName,
        jobTitle: "Consultant Homeopathic Physician (D.H.M.S, R.H.M.P)",
        url: "https://dr.noorulqamar.com/about",
      },
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
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
