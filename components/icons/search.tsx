import { LucideProps } from "lucide-react"

export function SearchIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M14.6667 14.6667L11.2667 11.2667M12.8889 7.11111C12.8889 10.2756 10.2756 12.8889 7.11111 12.8889C3.94657 12.8889 1.33333 10.2756 1.33333 7.11111C1.33333 3.94657 3.94657 1.33333 7.11111 1.33333C10.2756 1.33333 12.8889 3.94657 12.8889 7.11111Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
} 