import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Health & Wellness Blog | Thoughtful Homeopathy Insights | Doctor Dr. Noor ul Qamar",
  description:
    "Evidence-grounded health insights on hair fall, PCOS, stress, digestive wellness, allergies, and joint health written by Doctor Dr. Noor ul Qamar (D.H.M.S, R.H.M.P).",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup
        type="clinic"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Health & Wellness Blog", url: "/blog" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO HEADER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
              Patient Education & Clinical Guidance
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">
              Health & Homeopathy Blog
            </h1>
            <p className="text-sm sm:text-base text-sage-200 leading-relaxed max-w-2xl mx-auto">
              Clear, responsible, and empowering health articles to help you understand your body,
              manage daily lifestyle factors, and make informed choices.
            </p>
          </div>
        </section>

        {/* ================= FEATURED POST SPOTLIGHT ================= */}
        {featuredPost && (
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="wellness-card overflow-hidden bg-white border border-sage-200/80 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-sage-600">
                    <span className="font-bold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-200/60 uppercase tracking-wider">
                      Featured • {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredPost.readingTime}</span>
                    </span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-forest-950 hover:text-forest-800 transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-sm sm:text-base text-sage-800 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                    >
                      <span>Read Complete Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 aspect-16/10 rounded-2xl bg-gradient-to-br from-forest-50 via-sage-100 to-forest-100 border border-sage-200/80 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                  <BookOpen className="w-12 h-12 text-forest-800 mb-2" />
                  <span className="font-heading text-base font-bold text-forest-950">
                    Clinical Case Discussion
                  </span>
                  <span className="text-xs text-sage-600 mt-1">
                    By Dr. Noor ul Qamar, D.H.M.S, R.H.M.P
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= ALL ARTICLES GRID ================= */}
        <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-t border-sage-200 pt-10 mb-8 flex items-center justify-between">
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-forest-950">
              All Health Articles
            </h3>
            <span className="text-xs text-sage-600 font-medium">
              Categorised by medical speciality
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="wellness-card overflow-hidden bg-white p-6 flex flex-col justify-between group shadow-xs hover:border-gold-400/60 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-sage-600">
                    <span className="font-bold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  <h4 className="font-sans text-lg font-semibold text-forest-950 group-hover:text-forest-800 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <p className="text-xs sm:text-sm text-sage-700 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sage-100 flex items-center justify-between">
                  <span className="text-[11px] text-sage-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 group-hover:text-gold-600 transition-colors"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-14 p-8 rounded-2xl bg-forest-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-forest-800">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading text-xl font-bold">Have Specific Questions About Your Health?</h4>
              <p className="text-xs sm:text-sm text-sage-300">
                Discuss your symptoms directly with Dr. Noor ul Qamar in a private consultation.
              </p>
            </div>
            <Link
              href="/contact#book"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs shadow-md shrink-0 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
