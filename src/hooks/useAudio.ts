import { useCallback, useEffect, useRef } from "react";

export type SoundKey =
  | "ouch"
  | "impact"
  | "combo"
  | "critical"
  | "golden"
  | "level-complete"
  | "click";

const FILES: Record<SoundKey, string[]> = {
  ouch: ["/audio/ouch.mp3"],
  impact: ["/audio/impact.mp3"],
  combo: ["/audio/combo.mp3"],
  critical: ["/audio/critical.mp3"],
  golden: ["/audio/golden.mp3"],
  "level-complete": ["/audio/level-complete.mp3"],
  click: ["/audio/click.mp3"],
};

/** Fallback synthesized blips so the game always has feedback, even with no mp3 files. */
function beep(ctx: AudioContext, key: SoundKey) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const cfg: Record<SoundKey, [number, number, number, OscillatorType]> = {
    ouch: [420, 180, 0.14, "square"],
    impact: [120, 60, 0.12, "triangle"],
    combo: [660, 880, 0.1, "square"],
    critical: [300, 900, 0.16, "sawtooth"],
    golden: [880, 1400, 0.16, "sine"],
    "level-complete": [520, 1040, 0.18, "sine"],
    click: [700, 500, 0.06, "square"],
  };
  const [f0, f1, vol, type] = cfg[key];
  osc.type = type;
  osc.frequency.setValueAtTime(f0, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, f1), now + 0.16);
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

export function useAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const cacheRef = useRef<Map<string, HTMLAudioElement | null>>(new Map());

  // Preload the custom ouch sound so the first successful hit plays instantly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const src = FILES.ouch[0]!;
      const el = new Audio(src);
      el.preload = "auto";
      el.addEventListener("error", () => cacheRef.current.set(src, null), { once: true });
      cacheRef.current.set(src, el);
      el.load();
    } catch {
      /* never crash on audio */
    }
  }, []);

  const playOnce = useCallback((key: SoundKey) => {
    if (typeof window === "undefined") return;
    const list = FILES[key];
    const src = list[Math.floor(Math.random() * list.length)]!;
    try {
      let el = cacheRef.current.get(src);
      if (el === undefined) {
        el = new Audio(src);
        el.preload = "auto";
        el.addEventListener("error", () => cacheRef.current.set(src, null), { once: true });
        cacheRef.current.set(src, el);
      }
      if (el) {
        const node = el.cloneNode(true) as HTMLAudioElement;
        node.volume = 0.5;
        const p = node.play();
        if (p) {
          p.catch(() => {
            cacheRef.current.set(src, null);
            synth(key);
          });
        }
        return;
      }
    } catch {
      /* ignore */
    }
    synth(key);

    function synth(k: SoundKey) {
      try {
        const AC =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        if (!ctxRef.current) ctxRef.current = new AC();
        if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
        beep(ctxRef.current, k);
      } catch {
        /* silent */
      }
    }
  }, []);

  const play = useCallback(
    (key: SoundKey) => {
      if (!enabled || typeof window === "undefined") return;
      playOnce(key);
    },
    [enabled, playOnce],
  );

  return { play };
}
