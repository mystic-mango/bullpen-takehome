import { LucideProps } from "lucide-react"

export function WebsiteIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0.75 5H8.25M0.75 5C0.75 7.07107 2.42893 8.75 4.5 8.75M0.75 5C0.75 2.92893 2.42893 1.25 4.5 1.25M8.25 5C8.25 7.07107 6.57107 8.75 4.5 8.75M8.25 5C8.25 2.92893 6.57107 1.25 4.5 1.25M4.5 1.25C5.43798 2.27688 5.97103 3.60951 6 5C5.97103 6.39049 5.43798 7.72312 4.5 8.75M4.5 1.25C3.56202 2.27688 3.02897 3.60951 3 5C3.02897 6.39049 3.56202 7.72312 4.5 8.75"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}