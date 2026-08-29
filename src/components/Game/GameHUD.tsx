import { Volume2, VolumeX } from "lucide-react";

type Props = {
  levelId: number;
  levelName: string;
  score: number;
  hits: number;
  required: number;
  combo: number;
  anger: number;
  mood: string;
  soundOn: boolean;
  onToggleSound: () => void;
  onQuit: () => void;
};

export function GameHUD({
  levelId,
  levelName,
  score,
  hits,
  required,
  combo,
  anger,
  mood,
  soundOn,
  onToggleSound,
  onQuit,
}: Props) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2">
          <div className="min-w-0">
            <div className="comic-chip">LEVEL {levelId}</div>
            <p className="mt-1 truncate font-display text-xs text-[oklch(0.35_0.09_35)]">{levelName}</p>
          </div>
          <div className="text-center">
            <div className="font-display text-[clamp(26px,8vw,40px)] leading-none text-[oklch(0.98_0.02_90)] [paint-order:stroke_fill] [-webkit-text-stroke:3px_oklch(0.25_0.06_30)]">
              {score.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onToggleSound} className="comic-icon-btn pointer-events-auto" aria-label="Toggle sound">
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button type="button" onClick={onQuit} className="comic-icon-btn pointer-events-auto" aria-label="Quit to menu">
              ✕
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-[11px] tracking-wide text-[oklch(0.4_0.13_30)]">ANGER</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-[oklch(0.3_0.07_30)] bg-[oklch(0.95_0.03_70)]">
            <div
              className="h-full rounded-full transition-[width] duration-200"
              style={{
                width: `${anger}%`,
                background: "linear-gradient(90deg, oklch(0.8 0.16 90), oklch(0.6 0.24 28))",
              }}
            />
          </div>
          <span className="font-display text-[10px] text-[oklch(0.4_0.13_30)]">{mood}</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-3">
        <div className="comic-chip">
          HITS {hits}/{required}
        </div>
        {combo > 1 && (
          <div key={combo} className="animate-pop font-display text-[clamp(20px,6vw,32px)] text-[oklch(0.75_0.2_45)] [paint-order:stroke_fill] [-webkit-text-stroke:3px_oklch(0.25_0.06_30)]">
            COMBO x{combo}
          </div>
        )}
      </div>
    </>
  );
}
