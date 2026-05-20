import { redirect } from "next/navigation"
import { defaultLocale } from "@/content/config"

export default function MarketingPage() {
  redirect(`/${defaultLocale}`)
}
