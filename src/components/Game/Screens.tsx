import type { LevelStats } from "@/hooks/useGameState";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-dashed border-[oklch(0.8_0.06_50)] py-1.5">
      <span className="font-display text-xs tracking-wide text-[oklch(0.45_0.06_40)]">{label}</span>
      <span className="font-display text-lg text-[oklch(0.3_0.09_32)]">{value}</span>
    </div>
  );
}

export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[oklch(0.25_0.06_35)]/60 p-5 backdrop-blur-[2px]">
      <div className="animate-pop w-full max-w-[320px] rounded-3xl border-4 border-[oklch(0.28_0.07_32)] bg-[oklch(0.97_0.03_80)] p-5 shadow-[8px_10px_0_oklch(0.28_0.07_32)]">
        {children}
      </div>
    </div>
  );
}

export function HomeScreen({
  bestScore,
  highestLevel,
  reactions,
  totalReactions,
  onPlay,
}: {
  bestScore: number;
  highestLevel: number;
  reactions: number;
  totalReactions: number;
  onPlay: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-between bg-[oklch(0.25_0.06_35)]/35 px-5 py-10 text-center">
      <div>
        <h1 className="animate-wobble font-display text-[clamp(46px,15vw,76px)] leading-[0.85] text-[oklch(0.98_0.02_90)] [paint-order:stroke_fill] [-webkit-text-stroke:6px_oklch(0.28_0.07_32)]">
          OUCH
          <br />
          OUCH
        </h1>
        <p className="mx-auto mt-3 max-w-[260px] font-display text-xs tracking-wide text-[oklch(0.98_0.02_90)] [paint-order:stroke_fill] [-webkit-text-stroke:2px_oklch(0.28_0.07_32)]">
          The Most Pointless Game You'll Keep Playing
        </p>
      </div>

      <div className="w-full max-w-[300px]">
        <button type="button" onClick={onPlay} className="comic-btn w-full animate-pulse-soft text-2xl">
          TAP TO PLAY
        </button>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="comic-chip flex-col !py-2">
            <span className="text-[9px] opacity-70">BEST</span>
            <span className="text-sm">{bestScore.toLocaleString()}</span>
          </div>
          <div className="comic-chip flex-col !py-2">
            <span className="text-[9px] opacity-70">LEVEL</span>
            <span className="text-sm">{highestLevel}</span>
          </div>
          <div className="comic-chip flex-col !py-2">
            <span className="text-[9px] opacity-70">REACTIONS</span>
            <span className="text-sm">
              {reactions}/{totalReactions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LevelComplete({
  levelId,
  stats,
  onNext,
  onReplay,
}: {
  levelId: number;
  stats: LevelStats;
  onNext: () => void;
  onReplay: () => void;
}) {
  return (
    <Panel>
      <h2 className="text-center font-display text-3xl text-[oklch(0.55_0.21_28)]">LEVEL COMPLETE!</h2>
      <p className="mt-1 text-center font-display text-xs text-[oklch(0.45_0.06_40)]">LEVEL {levelId} CLEARED</p>
      <div className="mt-4">
        <Stat label="HITS" value={stats.hits} />
        <Stat label="SCORE" value={stats.score.toLocaleString()} />
        <Stat label="BEST COMBO" value={`x${stats.bestCombo}`} />
        <Stat label="CRITICAL OUCHES" value={stats.criticals} />
      </div>
      <button type="button" onClick={onNext} className="comic-btn mt-5 w-full">
        {levelId >= 5 ? "SEE RESULTS" : "NEXT LEVEL"}
      </button>
      <button type="button" onClick={onReplay} className="comic-btn-ghost mt-2 w-full">
        REPLAY LEVEL
      </button>
    </Panel>
  );
}

export function GameComplete({
  totals,
  reactions,
  totalReactions,
  onPlayAgain,
  onMenu,
}: {
  totals: LevelStats;
  reactions: number;
  totalReactions: number;
  onPlayAgain: () => void;
  onMenu: () => void;
}) {
  return (
    <Panel>
      <h2 className="animate-wobble text-center font-display text-4xl text-[oklch(0.62_0.22_45)]">OUCH MASTER!</h2>
      <div className="mt-4">
        <Stat label="TOTAL SCORE" value={totals.score.toLocaleString()} />
        <Stat label="TOTAL HITS" value={totals.hits} />
        <Stat label="BEST COMBO" value={`x${totals.bestCombo}`} />
        <Stat label="CRITICAL OUCHES" value={totals.criticals} />
        <Stat label="REACTIONS FOUND" value={`${reactions}/${totalReactions}`} />
      </div>
      <button type="button" onClick={onPlayAgain} className="comic-btn mt-5 w-full">
        PLAY AGAIN
      </button>
      <button type="button" onClick={onMenu} className="comic-btn-ghost mt-2 w-full">
        HOME
      </button>
    </Panel>
  );
}
