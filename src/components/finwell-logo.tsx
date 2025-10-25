import type { SVGProps } from 'react';

export function FinwellLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="32"
      height="32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Sail */}
      <path
        d="M16 48 C24 16, 48 16, 48 48 Z"
        fill="#FFE15A"
        stroke="#0047AB"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Waves */}
      <path
        d="M8 52 C12 56, 20 48, 28 52 S44 52, 56 52"
        stroke="#0047AB"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 58 C12 62, 20 54, 28 58 S44 58, 56 58"
        stroke="#0047AB"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sun */}
      <circle cx="52" cy="12" r="4" fill="#FFD93D" />
      <path
        d="M52 4 L52 0 M52 24 L52 20 M44 12 L40 12 M64 12 L60 12 M46.3 6.3 L42.6 2.6 M57.4 17.4 L53.7 13.7 M46.3 17.7 L42.6 21.4 M57.4 6.6 L53.7 10.3"
        stroke="#FFD93D"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
