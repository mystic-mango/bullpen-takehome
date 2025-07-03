import { LucideProps } from "lucide-react"

export function TwitterIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9.16314 0.999695H10.8499L7.16486 5.21144L11.5 10.9427H8.10562L5.44702 7.46671L2.40497 10.9427H0.717216L4.65872 6.43774L0.5 0.999695H3.98055L6.3837 4.17686L9.16314 0.999695ZM8.57115 9.93308H9.50579L3.4727 1.95626H2.46973L8.57115 9.93308Z"
        fill="currentColor"
      />
    </svg>
  )
}