import { useCallback, useRef } from "react";
import { Character } from "./Character";
import { Room } from "./Room";
import { GameHUD } from "./GameHUD";
import { EffectsLayer } from "./Effects";
import { GameComplete, HomeScreen, LevelComplete } from "./Screens";
import { useGameState } from "@/hooks/useGameState";

export function GameCanvas() {
  const g = useGameState();
  const stageRef = useRef<HTMLDivElement>(null);

  const handleHit = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      g.registerHit(e.clientX - rect.left, e.clientY - rect.top);
    },
    [g],
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[oklch(0.32_0.07_35)] bg-[radial-gradient(circle_at_50%_0%,oklch(0.45_0.1_45),oklch(0.25_0.06_32))] p-0 sm:p-4">
      <div
        ref={stageRef}
        className={`relative w-full max-w-[min(100vw,calc(100svh*9/16))] overflow-hidden bg-room-wall shadow-[0_20px_60px_rgba(0,0,0,.5)] sm:rounded-3xl sm:border-4 sm:border-[oklch(0.28_0.07_32)] ${
          g.shake > 0 ? "animate-shake" : ""
        } ${g.slowmo ? "saturate-150" : ""}`}
        style={{
          aspectRatio: "9 / 16",
          height: "min(100svh, calc(100vw * 16 / 9))",
          ["--shake-amount" as string]: `${g.shake}px`,
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <Room dim={g.dim} />

        <div className={g.rage ? "animate-rage absolute inset-0" : "absolute inset-0"}>
          <Character
            state={g.charState}
            mood={g.mood}
            offsetX={g.offsetX}
            goldenActive={g.golden}
            onHit={handleHit}
            onMiss={g.registerMiss}
          />
        </div>

        <EffectsLayer effects={g.effects} />

        {g.banner && (
          <div className="pointer-events-none absolute inset-x-0 top-[32%] z-20 text-center">
            <span className="animate-pop inline-block font-display text-[clamp(28px,9vw,52px)] text-[oklch(0.98_0.02_90)] [paint-order:stroke_fill] [-webkit-text-stroke:5px_oklch(0.28_0.07_32)]">
              {g.banner}
            </span>
          </div>
        )}

        {g.flash && <div className="pointer-events-none absolute inset-0 z-20 bg-white/70" />}

        {g.phase === "PLAYING" && (
          <GameHUD
            levelId={g.levelId}
            levelName={g.level.name}
            score={g.score}
            hits={g.levelStats.hits}
            required={g.level.requiredHits}
            combo={g.combo}
            anger={g.anger}
            mood={g.mood}
            soundOn={g.save.soundEnabled}
            onToggleSound={g.toggleSound}
            onQuit={g.toMenu}
          />
        )}

        {g.phase === "MENU" && (
          <HomeScreen
            bestScore={g.save.bestScore}
            highestLevel={g.save.highestLevel}
            reactions={g.reactionsCount}
            totalReactions={g.totalReactions}
            onPlay={g.startGame}
          />
        )}

        {g.phase === "LEVEL_COMPLETE" && (
          <LevelComplete levelId={g.levelId} stats={g.levelStats} onNext={g.nextLevel} onReplay={g.replayLevel} />
        )}

        {g.phase === "GAME_COMPLETE" && (
          <GameComplete
            totals={g.totals}
            reactions={g.reactionsCount}
            totalReactions={g.totalReactions}
            onPlayAgain={g.startGame}
            onMenu={g.toMenu}
          />
        )}
      </div>
    </div>
  );
}
