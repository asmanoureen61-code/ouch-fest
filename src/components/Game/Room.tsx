export function Room({ dim }: { dim: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-room-wall">
      <svg viewBox="0 0 400 700" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {/* back wall */}
        <rect x="0" y="0" width="400" height="440" fill="oklch(0.9 0.06 60)" />
        {/* side walls */}
        <path d="M0 0 L96 96 L96 470 L0 700 Z" fill="oklch(0.83 0.08 52)" />
        <path d="M400 0 L304 96 L304 470 L400 700 Z" fill="oklch(0.86 0.07 55)" />
        {/* floor */}
        <path d="M96 440 L304 440 L400 700 L0 700 Z" fill="oklch(0.7 0.15 48)" />
        {Array.from({ length: 13 }).map((_, i) => {
          const t = i / 12;
          const xTop = 96 + t * 208;
          const xBot = t * 400;
          return <line key={i} x1={xTop} y1="440" x2={xBot} y2="700" stroke="oklch(0.6 0.14 42)" strokeWidth="2.5" />;
        })}
        {[470, 512, 566, 632, 700].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="oklch(0.62 0.14 44)" strokeWidth="2" opacity="0.7" />
        ))}
        {/* skirting */}
        <rect x="96" y="424" width="208" height="18" fill="oklch(0.42 0.1 35)" />
        {/* window */}
        <rect x="150" y="120" width="104" height="120" rx="6" fill="oklch(0.45 0.09 30)" />
        <rect x="158" y="128" width="88" height="104" fill="oklch(0.86 0.08 230)" />
        <line x1="202" y1="128" x2="202" y2="232" stroke="oklch(0.45 0.09 30)" strokeWidth="7" />
        <line x1="158" y1="180" x2="246" y2="180" stroke="oklch(0.45 0.09 30)" strokeWidth="7" />
      </svg>

      {/* comic wall text */}
      <span className="absolute left-[2%] top-[24%] -rotate-12 font-display text-[clamp(22px,7vw,44px)] text-[oklch(0.55_0.21_28)] opacity-70">
        OUCH!
      </span>
      <span className="absolute right-[2%] top-[38%] rotate-12 font-display text-[clamp(20px,6vw,38px)] text-[oklch(0.55_0.21_28)] opacity-60">
        OW!
      </span>
      <span className="absolute right-[6%] top-[14%] rotate-6 font-display text-[clamp(16px,4.5vw,28px)] text-[oklch(0.55_0.21_28)] opacity-45">
        STOP!
      </span>

      <div
        className="pointer-events-none absolute inset-0 bg-[oklch(0.2_0.05_40)] transition-opacity duration-300"
        style={{ opacity: dim ? 0.55 : 0 }}
      />
    </div>
  );
}
