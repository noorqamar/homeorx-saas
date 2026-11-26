import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/patients",
          "/prescriptions",
          "/medicines",
          "/repertory",
          "/clinic",
          "/settings",
          "/api/",
        ],
      },
    ],
    sitemap: "https://dr.noorulqamar.com/sitemap.xml",
  };
}
