import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  User,
  CheckCircle2,
  Share2,
  MessageCircle,
  Award,
  BookOpen,
} from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog-posts";
import { getTreatmentBySlug } from "@/data/treatments";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { SchemaMarkup } from "@/components/public/schema-markup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Dr. Noor ul Qamar Health Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Dr. Noor ul Qamar"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedTreatments = post.relatedTreatmentSlugs
    .map((s) => getTreatmentBySlug(s))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup
        type="blog"
        blogData={{
          title: post.title,
          description: post.excerpt,
          date: post.date,
          slug: post.slug,
        }}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= ARTICLE HEADER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-sage-300">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-sage-500" />
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-sage-500" />
              <span className="text-gold-300 font-medium truncate">{post.title}</span>
            </nav>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
                {post.category} • Clinical Guidance
              </span>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-sage-300 pt-2">
                <span className="inline-flex items-center gap-1.5 font-medium text-white">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>By Dr. Noor ul Qamar (D.H.M.S, R.H.M.P)</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>{post.date}</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>{post.readingTime}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARTICLE BODY & SIDEBAR ================= */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Key Takeaways Box */}
              <div className="wellness-card p-6 sm:p-7 bg-forest-50/70 border border-forest-200/80 space-y-3 shadow-xs">
                <h2 className="font-heading text-lg font-bold text-forest-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Key Clinical Takeaways</span>
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-forest-900">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Text Content */}
              <div className="wellness-card p-6 sm:p-10 bg-white space-y-8 shadow-xs border border-sage-200/80">
                {post.content.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-950">
                      {section.heading}
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base text-sage-800 leading-relaxed">
                      {section.body.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Author Signature */}
                <div className="pt-6 border-t border-sage-200/80 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center font-bold text-sm shrink-0 border border-gold-500/30">
                    Dr. N
                  </div>
                  <div>
                    <span className="font-heading text-base font-bold text-forest-950 block">
                      {CLINIC_INFO.doctorName}
                    </span>
                    <span className="text-xs text-gold-700 font-semibold block">
                      {CLINIC_INFO.qualifications} • 10 Years Experience
                    </span>
                    <span className="text-[11px] text-sage-600">
                      LDA Avenue 1, Lahore & Worldwide Online Consultations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Appointment CTA Box */}
              <div className="rounded-2xl p-6 bg-forest-950 text-white space-y-4 border border-forest-800 shadow-md">
                <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">
                  Clinical Consultation
                </span>
                <h3 className="font-heading text-xl font-bold">
                  Discuss Your Symptoms With Dr. Noor ul Qamar
                </h3>
                <p className="text-xs text-sage-200 leading-relaxed">
                  Personalised, confidential case-taking in Lahore and via online WhatsApp
                  consultations.
                </p>
                <div className="space-y-2 pt-2">
                  <Link
                    href="/contact#book"
                    className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs text-center block shadow-sm transition-all"
                  >
                    Book Appointment Slot
                  </Link>
                  <a
                    href={CLINIC_INFO.whatsappDefaultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 border border-forest-700 text-white font-bold text-xs text-center block transition-all"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Related Treatment Links */}
              {relatedTreatments.length > 0 && (
                <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                    Related Treatment Guides
                  </h4>
                  <div className="space-y-2">
                    {relatedTreatments.map((treatment) => treatment && (
                      <Link
                        key={treatment.slug}
                        href={`/treatments/${treatment.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-forest-50 text-xs font-semibold text-forest-950 group transition-colors"
                      >
                        <span className="truncate">{treatment.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-sage-400 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
