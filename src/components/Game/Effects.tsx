import type { Effect } from "@/hooks/useGameState";

export function ImpactBurst({ scale, rot }: { scale: number; rot: number }) {
  return (
    <svg viewBox="0 0 100 100" className="animate-burst h-[120px] w-[120px]" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
      <path
        d="M50 2 L60 30 L88 18 L74 45 L98 55 L70 62 L82 90 L54 74 L46 98 L38 72 L12 84 L22 56 L2 46 L28 38 L16 12 L42 26 Z"
        fill="oklch(0.9 0.18 92)"
        stroke="oklch(0.5 0.2 30)"
        strokeWidth="4"
      />
    </svg>
  );
}

export function EffectsLayer({ effects }: { effects: Effect[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {effects.map((e) => (
        <div key={e.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: e.x, top: e.y }}>
          {e.kind === "burst" && <ImpactBurst scale={e.scale} rot={e.rot} />}
          {e.kind === "comic" && (
            <span
              className="animate-comic block whitespace-nowrap font-display text-[clamp(22px,7vw,40px)] leading-none"
              style={{
                transform: `rotate(${e.rot}deg) scale(${e.scale})`,
                color: e.golden ? "oklch(0.85 0.17 90)" : e.critical ? "oklch(0.65 0.24 25)" : "oklch(0.98 0.02 90)",
                WebkitTextStroke: "3px oklch(0.25 0.06 30)",
                paintOrder: "stroke fill",
              }}
            >
              {e.text}
            </span>
          )}
          {e.kind === "score" && (
            <span
              className="animate-float block font-display text-[clamp(16px,4.5vw,26px)] leading-none"
              style={{
                color: e.golden ? "oklch(0.85 0.17 90)" : "oklch(0.95 0.13 140)",
                WebkitTextStroke: "2px oklch(0.25 0.06 30)",
                paintOrder: "stroke fill",
              }}
            >
              {e.text}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
