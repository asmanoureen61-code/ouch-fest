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

const SKIN = "#e8b184";
const SKIN_SHADE = "#c9895c";
const HOODIE = "#1c1e33";
const HOODIE_DARK = "#12142a";
const HAIR = "#20150f";
const DENIM = "#2f52a8";
const DENIM_DARK = "#1d3877";
const LEGGING = "#181a20";

/** Small teddy-bear print motif from the reference hoodie. */
function Bear({ x, y, r, s }: { x: number; y: number; r: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <circle cx="-5.6" cy="-6.4" r="3" fill="#c9603f" />
      <circle cx="5.6" cy="-6.4" r="3" fill="#c9603f" />
      <ellipse cx="0" cy="2.6" rx="6.4" ry="6" fill="#d8724a" />
      <circle cx="0" cy="-4.4" r="5.4" fill="#e0855c" />
      <circle cx="-1.9" cy="-5.4" r="0.9" fill="#2a1710" />
      <circle cx="1.9" cy="-5.4" r="0.9" fill="#2a1710" />
      <ellipse cx="0" cy="-2.6" rx="2.1" ry="1.5" fill="#f2c39f" />
      <ellipse cx="-6.6" cy="2.4" rx="2.6" ry="3.4" fill="#d8724a" transform="rotate(-20 -6.6 2.4)" />
      <ellipse cx="6.6" cy="2.4" rx="2.6" ry="3.4" fill="#d8724a" transform="rotate(20 6.6 2.4)" />
      <ellipse cx="-3" cy="8.4" rx="2.4" ry="2.9" fill="#e0855c" />
      <ellipse cx="3" cy="8.4" rx="2.4" ry="2.9" fill="#e0855c" />
    </g>
  );
}

function Sneaker({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-6 -16 q22 -2 34 12 q6 8 -4 12 l-42 0 q-8 -1 -8 -8 l0 -14 q10 -3 20 -2 z" fill="#f5f2ea" stroke="#20222b" strokeWidth="3.4" />
      <path d="M-4 -14 q16 0 26 12 q-14 4 -26 2 z" fill="#e2402f" />
      <path d="M-26 -12 q-6 4 -6 10" stroke="#e2402f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-26 4 l46 0" stroke="#20222b" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-20 -12 l8 8 M-12 -14 l8 9" stroke="#20222b" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

export function Character({ state, mood, offsetX, goldenActive, onHit, onMiss }: Props) {
  const furious = mood === "FURIOUS" || mood === "VERY ANGRY";
  const looking = state === "look-back" || state === "turn-around" || state === "angry";
  const open = state !== "idle";

  return (
    <div
      className="pointer-events-none absolute bottom-[12%] left-1/2 w-[80%] max-w-[430px] select-none"
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
          {/* floor contact shadow */}
          <ellipse cx="150" cy="322" rx="112" ry="15" fill="#000" opacity="0.2" />

          {/* ---- BACK LEG (bare, camera-left) ---- */}
          <path d="M100 194 L80 250 L74 300" stroke={SKIN_SHADE} strokeWidth="30" strokeLinecap="round" fill="none" />
          <path d="M100 192 L82 248 L76 298" stroke={SKIN} strokeWidth="26" strokeLinecap="round" fill="none" />
          <Sneaker x={64} y={312} flip />

          {/* ---- FRONT LEG (bare thigh + black knee-length legging) ---- */}
          <path d="M152 198 L172 248 L166 296" stroke={SKIN} strokeWidth="36" strokeLinecap="round" fill="none" />
          <path d="M172 244 L176 272 L168 298" stroke={LEGGING} strokeWidth="32" strokeLinecap="round" fill="none" />
          <Sneaker x={174} y={312} />

          {/* ---- SHORTS / BACKSIDE ---- */}
          <g transform="translate(-4 -18)">
            <path
              d="M172 156 q32 44 8 84 q-38 30 -86 12 q-42 -16 -40 -56 q2 -38 46 -50 q50 -12 72 10 z"
              fill={DENIM}
              stroke={DENIM_DARK}
              strokeWidth="5"
            />
            <path d="M62 154 q-32 18 -28 52 q4 32 34 38 q-24 -44 -6 -90 z" fill="#3a63c2" stroke={DENIM_DARK} strokeWidth="4" />
            <path d="M48 196 q22 -8 36 4" stroke={DENIM_DARK} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M96 238 q26 10 58 -2" stroke={DENIM_DARK} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* ---- HOODIE TORSO (leaning forward, back to camera-left) ---- */}
          <path
            d="M106 162 q-16 -62 38 -92 q52 -30 92 -6 q38 22 32 68 q-6 42 -40 58 q-48 22 -90 4 q-28 -12 -32 -32 z"
            fill={HOODIE}
            stroke={HOODIE_DARK}
            strokeWidth="5"
          />
          <path d="M114 152 q-8 -48 34 -76" stroke="#2a2d47" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* bear print */}
          {([
            [140, 118, -12, 0.95],
            [178, 96, 8, 0.9],
            [214, 122, -6, 0.85],
            [158, 150, 14, 1],
            [200, 160, -10, 0.9],
            [130, 156, 6, 0.85],
            [232, 96, 12, 0.75],
            [176, 186, -4, 0.8],
            [244, 144, -14, 0.7],
          ] as [number, number, number, number][]).map(([x, y, r, s], i) => (
            <Bear key={i} x={x} y={y} r={r} s={s} />
          ))}

          {/* hood bunched behind neck */}
          <path d="M216 66 q46 8 50 50 q2 28 -20 38 q12 -48 -34 -72 z" fill={HOODIE_DARK} stroke="#0d0f1f" strokeWidth="4" />

          {/* arm to knee */}
          <path d="M176 166 q0 46 -4 70" stroke={HOODIE} strokeWidth="28" strokeLinecap="round" fill="none" />
          <path d="M176 166 q0 46 -4 70" stroke="#2a2d47" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.35" />
          <circle cx="170" cy="252" r="14" fill={SKIN} stroke={SKIN_SHADE} strokeWidth="3" />

          {/* ---- HEAD (turned toward player) ---- */}
          <g style={{ transformOrigin: "236px 92px", transform: looking ? "rotate(-9deg)" : "none", transition: "transform 180ms" }}>
            {/* long hair behind */}
            <path d="M196 66 q28 -44 74 -30 q44 14 40 62 q-4 40 -18 60 q-8 10 -14 -2 q10 -34 4 -58 q-40 12 -76 -8 z" fill={HAIR} />
            {/* face */}
            <path d="M206 60 q34 -28 66 -4 q28 22 18 60 q-8 34 -42 40 q-40 6 -52 -30 q-12 -34 10 -66 z" fill={SKIN} stroke={SKIN_SHADE} strokeWidth="4" />
            {/* hood over head */}
            <path
              d="M198 74 q-6 -50 44 -56 q52 -6 62 40 q6 30 -8 48 q-2 -34 -20 -48 q-30 -22 -62 -6 q-12 6 -16 22 z"
              fill={HOODIE}
              stroke={HOODIE_DARK}
              strokeWidth="4"
            />
            <path d="M292 88 q18 32 6 66 q-6 14 -18 6 q12 -34 0 -68 z" fill={HAIR} />
            <path d="M202 92 q-12 34 0 62 q6 12 16 4 q-12 -34 -2 -64 z" fill={HAIR} />

            {/* eyes (squeezed with laughter) */}
            <g className="animate-blink">
              {furious ? (
                <>
                  <path d="M222 98 q10 6 20 2" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M252 98 q10 -4 20 2" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M222 102 q10 -11 20 -1" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M252 102 q10 -11 20 -1" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />
                </>
              )}
            </g>
            {/* brows */}
            <path d={furious ? "M218 86 q12 -2 24 6" : "M218 88 q12 -7 24 -3"} stroke={HAIR} strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d={furious ? "M250 92 q12 -8 24 -6" : "M250 85 q12 -4 24 3"} stroke={HAIR} strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* moustache + full beard */}
            <path d="M206 116 q6 52 46 50 q46 -2 50 -52 q-16 30 -50 30 q-36 0 -46 -28 z" fill={HAIR} />
            <path d="M232 116 q16 -8 32 0" stroke={HAIR} strokeWidth="9" fill="none" strokeLinecap="round" />
            {/* open laughing mouth */}
            <ellipse cx="250" cy="132" rx={open ? 17 : 13} ry={open ? 15 : 11} fill="#6f1f2c" stroke={HAIR} strokeWidth="3" />
            <ellipse cx="250" cy={open ? 124 : 126} rx={open ? 12 : 9} ry="5" fill="#fff4f1" />
            <ellipse cx="250" cy={open ? 142 : 139} rx={open ? 8 : 6} ry="3.4" fill="#d1596a" />
          </g>
        </svg>

        {/* backside hitbox — centred on the hip/backside of the new character */}
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
          style={{ left: "12%", top: "44%", width: "38%", height: "32%", background: "transparent", touchAction: "manipulation" }}
        />
        {/* non-scoring body area (torso + head) */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onPointerDown={(e) => {
            e.preventDefault();
            onMiss();
          }}
          className="pointer-events-auto absolute right-0 top-0 h-[62%] w-[44%] bg-transparent outline-none"
          style={{ touchAction: "manipulation" }}
        />
      </div>
    </div>
  );
}
