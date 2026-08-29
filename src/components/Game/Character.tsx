import type { CharacterState } from "@/hooks/useGameState";

type Props = {
  state: CharacterState;
  mood: string;
  offsetX: number;
  goldenActive: boolean;
  onHit: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onMiss: () => void;
};

const STATE_TRANSFORM: Record<CharacterState, string> = {
  idle: "translate3d(0,0,0)",
  "hit-small": "translate3d(0,-8px,0) rotate(3deg)",
  "hit-medium": "translate3d(0,-16px,0) rotate(-6deg)",
  "hit-big": "translate3d(0,-30px,0) rotate(10deg) scale(1.05)",
  jump: "translate3d(0,-52px,0) rotate(-4deg) scale(1.04)",
  angry: "translate3d(0,-4px,0) scale(1.03)",
  "look-back": "translate3d(0,0,0) rotate(-2deg)",
  cover: "translate3d(0,6px,0) scale(0.96)",
  crouch: "translate3d(0,18px,0) scaleY(0.82)",
  "dodge-left": "translate3d(-70px,-6px,0) rotate(-8deg)",
  "dodge-right": "translate3d(70px,-6px,0) rotate(8deg)",
  "turn-around": "translate3d(0,-6px,0) rotateY(180deg)",
  run: "translate3d(0,-10px,0) rotate(-3deg) scale(0.94)",
  celebrate: "translate3d(0,-60px,0) rotate(-12deg) scale(1.08)",
};

export function Character({ state, mood, offsetX, goldenActive, onHit, onMiss }: Props) {
  const furious = mood === "FURIOUS" || mood === "VERY ANGRY";
  const looking = state === "look-back" || state === "turn-around" || state === "angry";

  return (
    <div
      className="pointer-events-none absolute bottom-[13%] left-1/2 w-[78%] max-w-[420px] select-none"
      style={{
        transform: `translateX(calc(-50% + ${offsetX}px))`,
        transition: "transform 260ms cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <div
        className="relative animate-breathe"
        style={{
          transform: STATE_TRANSFORM[state],
          transition: "transform 170ms cubic-bezier(.34,1.8,.5,1)",
        }}
      >
        <svg viewBox="0 0 320 340" className="w-full drop-shadow-[0_16px_18px_rgba(80,30,0,.28)]" aria-hidden="true">
          <ellipse cx="160" cy="326" rx="108" ry="14" fill="#000" opacity="0.18" />

          {/* back leg */}
          <path d="M182 200 L196 262 L206 312" stroke="#e8ab7d" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M196 258 q14 4 16 16" stroke="#2b3550" strokeWidth="16" strokeLinecap="round" fill="none" />
          {/* front leg */}
          <path d="M136 204 L118 260 L126 310" stroke="#f3bc8c" strokeWidth="30" strokeLinecap="round" fill="none" />
          <path d="M116 254 q-14 6 -14 18" stroke="#2b3550" strokeWidth="18" strokeLinecap="round" fill="none" />

          {/* shoes */}
          <g>
            <path d="M186 300 q34 4 40 16 q2 10 -14 10 l-40 0 q-10 -2 -8 -12 z" fill="#f4f1e8" stroke="#2b2b33" strokeWidth="4" />
            <path d="M186 316 l40 0" stroke="#e2402f" strokeWidth="6" strokeLinecap="round" />
            <path d="M104 298 q-36 6 -42 18 q-2 10 14 10 l42 0 q10 -2 8 -12 z" fill="#f4f1e8" stroke="#2b2b33" strokeWidth="4" />
            <path d="M108 316 l-42 0" stroke="#e2402f" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* shorts / backside */}
          <g transform="translate(-16 6) scale(1.06 1.04)">
          <path
            d="M196 150 q26 46 -2 80 q-40 26 -92 8 q-42 -16 -42 -52 q0 -40 46 -50 q54 -12 90 14 z"
            fill="#2f4f9e"
            stroke="#1e3468"
            strokeWidth="5"
          />
          <path d="M76 148 q-32 16 -28 48 q4 30 34 36 q-22 -40 -6 -84 z" fill="#3a5fb8" stroke="#1e3468" strokeWidth="4" />
          <path d="M62 186 q22 -6 34 6" stroke="#22417f" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          {/* hoodie */}
          <path
            d="M120 176 q-8 -60 40 -86 q46 -24 84 -4 q34 18 30 60 q-4 40 -34 56 q-44 22 -84 6 q-30 -10 -36 -32 z"
            fill="#22262f"
            stroke="#12141a"
            strokeWidth="5"
          />
          {[
            [150, 120],
            [186, 96],
            [214, 132],
            [168, 158],
            [232, 168],
            [138, 158],
            [206, 76],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-6" rx="3.4" ry="5.4" fill={i % 2 ? "#f06b7a" : "#f2c14e"} transform={`rotate(${a})`} />
              ))}
              <circle r="2.4" fill="#fff5e0" />
            </g>
          ))}
          {/* hood */}
          <path d="M214 74 q40 6 44 44 q2 26 -18 34 q10 -44 -30 -66 z" fill="#171a21" stroke="#12141a" strokeWidth="4" />
          {/* arm */}
          <path d="M158 168 q-16 42 -22 66" stroke="#22262f" strokeWidth="26" strokeLinecap="round" fill="none" />
          <circle cx="134" cy="238" r="14" fill="#f3bc8c" stroke="#c98a5c" strokeWidth="3" />

          {/* head */}
          <g style={{ transformOrigin: "236px 96px", transform: looking ? "rotate(-8deg)" : "none", transition: "transform 180ms" }}>
            <path d="M204 58 q34 -30 68 -6 q30 22 20 62 q-8 34 -44 40 q-40 6 -54 -30 q-12 -34 10 -66 z" fill="#f3bc8c" stroke="#c98a5c" strokeWidth="4" />
            {/* hair */}
            <path d="M198 74 q4 -46 50 -48 q48 -2 54 42 q4 30 -8 44 q2 -34 -22 -44 q-30 -12 -56 6 q-14 10 -18 0 z" fill="#241a16" />
            <path d="M288 92 q16 34 6 66 q-4 14 -16 8 q10 -34 -2 -66 z" fill="#241a16" />
            <path d="M200 96 q-12 32 -2 60 q6 12 16 4 q-10 -32 0 -62 z" fill="#241a16" />
            {/* eyes */}
            <g className="animate-blink">
              {furious ? (
                <>
                  <path d="M222 96 q10 6 20 2" stroke="#241a16" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M252 96 q10 -4 20 2" stroke="#241a16" strokeWidth="5" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M222 100 q10 -10 20 0" stroke="#241a16" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M252 100 q10 -10 20 0" stroke="#241a16" strokeWidth="5" fill="none" strokeLinecap="round" />
                </>
              )}
            </g>
            {/* brows */}
            <path
              d={furious ? "M218 84 q12 -2 24 6" : "M218 86 q12 -6 24 -2"}
              stroke="#241a16"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={furious ? "M250 90 q12 -8 24 -6" : "M250 84 q12 -4 24 2"}
              stroke="#241a16"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* beard + mouth */}
            <path d="M208 116 q6 46 44 44 q42 -2 46 -46 q-14 26 -46 26 q-34 0 -44 -24 z" fill="#241a16" />
            <ellipse cx="250" cy="126" rx={state === "idle" ? 12 : 18} ry={state === "idle" ? 10 : 16} fill="#7a2230" />
            <ellipse cx="250" cy={state === "idle" ? 122 : 120} rx={state === "idle" ? 8 : 12} ry="5" fill="#fff2f0" />
          </g>
        </svg>

        {/* backside hitbox */}
        <button
          type="button"
          aria-label="Tap the backside"
          onPointerDown={(e) => {
            e.preventDefault();
            onHit(e);
          }}
          className={`pointer-events-auto absolute rounded-[50%] outline-none ${
            goldenActive ? "animate-golden ring-4 ring-[oklch(0.85_0.17_90)]" : ""
          }`}
          style={{ left: "4%", top: "38%", width: "46%", height: "36%", background: "transparent", touchAction: "manipulation" }}
        />
        {/* non-scoring body area */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onPointerDown={(e) => {
            e.preventDefault();
            onMiss();
          }}
          className="pointer-events-auto absolute right-0 top-0 h-[70%] w-[46%] bg-transparent outline-none"
          style={{ touchAction: "manipulation" }}
        />
      </div>
    </div>
  );
}
