import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({
  className,
  ...props
}: ContainerProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className={cn("max-w-7xl mx-auto", className)} {...props} />
    </div>
  )
}

export function MaxWidthWrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props} />
  )
}

export function SectionContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(
      "w-full py-24 sm:py-32 lg:py-40",
      "relative overflow-hidden",
      className
    )} {...props} />
  )
}
