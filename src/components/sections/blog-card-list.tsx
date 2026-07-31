import Link from "next/link"
import type { SupportedLocale } from "@/content/config"
import { BLOG_POSTS } from "@/content/playhouse/blog"

export default function BlogCardList({ lang }: { lang: SupportedLocale }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {BLOG_POSTS.map((localized) => {
        const post = localized[lang]
        return (
          <article key={post.slug} className="rounded-xl border border-foreground/10 bg-background/70 p-4 transition-colors hover:border-deep-red/40">
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-deep-red">Playhouse Journal</p>
            <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
            <p className="mt-2 text-sm leading-6 text-foreground/70">{post.description}</p>
            <Link className="mt-3 inline-flex text-sm font-semibold text-deep-red underline-offset-4 hover:underline" href={`/${lang}/blog/${post.slug}`}>
              {lang === "es" ? "Leer artículo" : "Read article"} →
            </Link>
          </article>
        )
      })}
    </div>
  )
}
