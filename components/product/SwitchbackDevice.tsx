import { cn } from "@/lib/utils";

export function SwitchbackDevice({ className, width = 400, height = 340 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block drop-shadow-[0_10px_30px_rgba(0,0,0,0.12)]", className)}
      aria-label="Switchback mechanical puzzle"
    >
      <defs>
        <linearGradient id="pressGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE9DB" />
        </linearGradient>
        <linearGradient id="paper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FBFAF7" />
          <stop offset="100%" stopColor="#F4F1EA" />
        </linearGradient>
        <linearGradient id="hubGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FF4D12" />
          <stop offset="100%" stopColor="#D63A08" />
        </linearGradient>
      </defs>

      <rect x="40" y="40" width="320" height="260" rx="28" fill="url(#paper)" stroke="#17140F" strokeWidth="2" />
      <circle cx="200" cy="220" r="16" fill="url(#hubGrad)" />

      {/* PRESS station */}
      <g>
        <text x="90" y="62" fontFamily="var(--font-space-mono)" fontSize="10" fontWeight="700" fill="#6E6A61" letterSpacing="0.1em">PRESS</text>
        <rect x="50" y="72" width="80" height="80" rx="16" fill="url(#pressGrad)" stroke="#E2DCD0" strokeWidth="2" />
        <circle cx="90" cy="112" r="20" fill="#17140F" />
        <circle cx="90" cy="112" r="6" fill="#FFFFFF" opacity="0.6" />
        <path d="M90 96 L90 128 M74 112 L106 112" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* ROTATE station */}
      <g>
        <text x="230" y="62" fontFamily="var(--font-space-mono)" fontSize="10" fontWeight="700" fill="#6E6A61" letterSpacing="0.1em">ROTATE</text>
        <circle cx="270" cy="112" r="28" fill="url(#pressGrad)" stroke="#E2DCD0" strokeWidth="2" />
        <circle cx="270" cy="112" r="12" fill="#17140F" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 270 + Math.cos(rad) * 22;
          const y1 = 112 + Math.sin(rad) * 22;
          const x2 = 270 + Math.cos(rad) * 28;
          const y2 = 112 + Math.sin(rad) * 28;
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#17140F" strokeWidth="1.5" opacity="0.35" />
          );
        })}
      </g>

      {/* SLIDE station */}
      <g>
        <text x="135" y="162" fontFamily="var(--font-space-mono)" fontSize="10" fontWeight="700" fill="#6E6A61" letterSpacing="0.1em">SLIDE</text>
        <rect x="135" y="200" width="130" height="10" rx="5" fill="#E2DCD0" />
        <rect x="135" y="194" width="30" height="22" rx="8" fill="#17140F" />
        <rect x="150" y="202" width="10" height="6" rx="2" fill="#FFFFFF" opacity="0.6" />
      </g>

      <text x="200" y="320" fontFamily="var(--font-space-mono)" fontSize="10" fill="#6E6A61" textAnchor="middle" letterSpacing="0.12em">
        Switchback — press · rotate · slide
      </text>
    </svg>
  );
}
