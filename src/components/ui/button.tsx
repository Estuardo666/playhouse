"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold text-deep-red hover:bg-gold/90 active:bg-gold/80 shadow-lg hover:shadow-xl h-12 px-8",
        secondary: "bg-transparent border-2 border-gold text-gold hover:bg-gold/10 hover:border-gold/80 h-12 px-8",
        ghost: "hover:bg-gold/10 hover:text-gold h-11 px-8",
        outline: "border-2 border-deep-red text-deep-red hover:bg-deep-red hover:text-white h-12 px-8",
        destructive: "bg-red-500 hover:bg-red-500/90 text-white h-12 px-8",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 rounded-lg px-6",
        lg: "h-14 rounded-xl px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
