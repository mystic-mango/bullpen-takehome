import { LucideProps } from "lucide-react";

export function WalletIcon({ className, ...props }: LucideProps) {
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
        d="M10.9999 9.33333H11.0065M1.99988 3.33333V12.6667C1.99988 13.403 2.59683 14 3.33321 14H12.6665C13.4029 14 13.9999 13.403 13.9999 12.6667V6C13.9999 5.26362 13.4029 4.66667 12.6665 4.66667L3.33321 4.66667C2.59683 4.66667 1.99988 4.06971 1.99988 3.33333ZM1.99988 3.33333C1.99988 2.59695 2.59683 2 3.33321 2H11.3332M11.3332 9.33333C11.3332 9.51743 11.184 9.66667 10.9999 9.66667C10.8158 9.66667 10.6665 9.51743 10.6665 9.33333C10.6665 9.14924 10.8158 9 10.9999 9C11.184 9 11.3332 9.14924 11.3332 9.33333Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
