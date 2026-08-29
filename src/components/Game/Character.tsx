import type { CharacterState } from "@/hooks/useGameState";
import characterImg from "@/assets/character.png";

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

  return (
    <div
      className="pointer-events-none absolute bottom-[10%] left-1/2 w-[82%] max-w-[440px] select-none"
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
        {/* floor contact shadow */}
        <div
          className="absolute bottom-[1%] left-1/2 h-[5%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-[3px]"
          aria-hidden="true"
        />

        <img
          src={characterImg}
          alt="Character standing bent forward"
          draggable={false}
          className="relative block w-full drop-shadow-[0_16px_18px_rgba(80,30,0,.28)]"
          style={{
            filter: furious ? "saturate(1.18) contrast(1.05)" : undefined,
            transition: "filter 200ms",
          }}
        />

        {/* backside hitbox — centred on the hip/backside of the character */}
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
          style={{ left: "4%", top: "37%", width: "30%", height: "24%", background: "transparent", touchAction: "manipulation" }}
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
          className="pointer-events-auto absolute right-0 top-0 h-[62%] w-[52%] bg-transparent outline-none"
          style={{ touchAction: "manipulation" }}
        />
      </div>
    </div>
  );
}
