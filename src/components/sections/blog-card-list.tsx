import Link from "next/link"
import type { SupportedLocale } from "@/content/config"
import { BLOG_POSTS } from "@/content/playhouse/blog"

export default function BlogCardList({ lang }: { lang: SupportedLocale }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {BLOG_POSTS.map((localized) => {
        const post = localized[lang]
        return (
          <article key={post.slug} className="rounded-2xl border border-foreground/10 bg-background/70 p-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-deep-red">Playhouse Journal</p>
            <h2 className="text-xl font-semibold leading-tight">{post.title}</h2>
            <p className="mt-3 leading-7 text-foreground/70">{post.description}</p>
            <Link className="mt-5 inline-flex font-semibold text-deep-red underline-offset-4 hover:underline" href={`/${lang}/blog/${post.slug}`}>
              {lang === "es" ? "Leer artículo" : "Read article"} →
            </Link>
          </article>
        )
      })}
    </div>
  )
}
