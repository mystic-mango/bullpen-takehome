import { LucideProps } from "lucide-react"

export function SwitchIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2.33337 8.5H10.3334M10.3334 8.5L8.33337 6.5M10.3334 8.5L8.33337 10.5M10.3334 3.5H2.33337M2.33337 3.5L4.33337 1.5M2.33337 3.5L4.33337 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
