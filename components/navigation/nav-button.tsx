import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const navButtonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        icon: [
          "bg-background border border-border text-white",
          "hover:bg-accent hover:border-accent-foreground/20 hover:[&_svg]:text-accent-foreground",
          "active:bg-accent/80 active:border-accent-foreground/30 active:[&_svg]:text-accent-foreground",
          "data-[state=open]:bg-accent data-[state=open]:border-accent-foreground/30 data-[state=open]:[&_svg]:text-accent-foreground"
        ],
        text: [
          "bg-background border border-border gap-1 font-favorit text-sm font-normal text-white leading-5",
          "hover:bg-accent hover:border-accent-foreground/20 hover:text-accent-foreground hover:[&_svg]:text-accent-foreground",
          "active:bg-accent/80 active:border-accent-foreground/30 active:text-accent-foreground active:[&_svg]:text-accent-foreground",
          "data-[state=open]:bg-accent data-[state=open]:border-accent-foreground/30 data-[state=open]:[&_svg]:text-accent-foreground"
        ]
      },
      size: {
        icon: "h-8 p-[8px]",
        text: "h-8 px-2.5 py-2"
      }
    },
    defaultVariants: {
      variant: "icon",
      size: "icon"
    }
  }
)

export interface NavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navButtonVariants> {
  asChild?: boolean
}

export function NavButton({
  className,
  variant,
  asChild = false,
  ...props
}: NavButtonProps) {
  const Comp = asChild ? Slot : "button"
  const sizeVariant = variant === "text" ? "text" : "icon"

  return (
    <Comp
      className={cn(navButtonVariants({ variant, size: sizeVariant, className }))}
      {...props}
    />
  )
} 