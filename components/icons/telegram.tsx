import { LucideProps } from "lucide-react"

export function TelegramIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <mask id="telegram-mask">
          <rect width="9" height="8" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.74402 1.80305L2.86481 4.19223C2.71613 4.28398 2.64615 4.46354 2.69412 4.63164L3.11353 6.10537C3.14336 6.20978 3.29486 6.19911 3.30938 6.09123L3.41839 5.28306C3.43898 5.1309 3.51153 4.99064 3.62409 4.88593L6.82551 1.91003C6.88546 1.85452 6.8137 1.76026 6.74402 1.80305Z"
            fill="black"
          />
        </mask>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.69242 0.53162L7.23053 7.56338C7.1961 7.7294 7.00142 7.80464 6.86406 7.70482L4.86845 6.25598C4.74731 6.168 4.58211 6.17268 4.46613 6.26724L3.35969 7.16916C3.2313 7.27417 3.0378 7.21565 2.98863 7.0575L2.22036 4.58672L0.235469 3.84593C0.0338435 3.7704 0.0321208 3.48575 0.233172 3.40831L8.37919 0.265785C8.55189 0.199005 8.73005 0.350286 8.69242 0.53162Z"
        fill="currentColor"
        mask="url(#telegram-mask)"
      />
    </svg>
  )
}