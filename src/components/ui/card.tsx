import { cn } from "@/lib/utils"

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border/50 bg-card shadow-lg hover:shadow-2xl hover:shadow-gold/25 transition-all duration-500 overflow-hidden bg-gradient-to-br from-background/80 backdrop-blur-sm",
        "hover:-translate-y-2 hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-8 pb-4 sm:p-10 sm:pb-6", className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-gold transition-colors",
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-lg leading-relaxed mt-2",
        className
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-8 pt-0 sm:p-10 sm:pt-0", className)} {...props} />
  )
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-8 pt-0 gap-4 sm:p-10 sm:pt-0", className)}
      {...props}
    />
  )
}
