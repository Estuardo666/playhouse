import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { SupportedLocale } from "@/content/config"
import { getBlogPost, getBlogSlugs } from "@/content/playhouse/blog"

export function generateStaticParams() {
  return getBlogSlugs().flatMap((slug) => [{ lang: "es", slug }, { lang: "en", slug }])
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as SupportedLocale
  const post = getBlogPost(params.slug, lang)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default function BlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as SupportedLocale
  const post = getBlogPost(params.slug, lang)
  if (!post) notFound()
  const siteUrl = "https://playhouseec.com"
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date, author: { "@type": "Organization", name: "Playhouse" }, publisher: { "@type": "Organization", name: "Playhouse", url: siteUrl }, mainEntityOfPage: `${siteUrl}/${lang}/blog/${post.slug}` }
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="text-xs uppercase tracking-[0.2em] text-deep-red">Playhouse Journal · {post.date}</p>
      <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
      <p className="mt-6 text-xl leading-8 text-foreground/70">{post.intro}</p>
      <div className="mt-12 space-y-10">
        {post.sections.map((section) => <section key={section.heading}><h2 className="text-2xl font-semibold">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-foreground/75">{paragraph}</p>)}</section>)}
      </div>
      <div className="mt-14 rounded-2xl bg-deep-red p-7 text-white"><p className="text-xl font-semibold">{post.cta}</p><Link className="mt-4 inline-flex underline underline-offset-4" href={`/${lang}/teatro-en-ingles-loja`}>{lang === "es" ? "Conocer Playhouse →" : "Explore Playhouse →"}</Link></div>
    </main>
  )
}
