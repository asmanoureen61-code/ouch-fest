import { useCallback, useEffect, useRef, useState } from "react";
import { getLevel, LEVELS } from "@/data/levels";
import { RARITY_WEIGHTS, REACTION_POOLS, SECRET_REACTIONS } from "@/data/reactions";
import { chance, pick, rand, randInt, weightedPick } from "@/utils/random";
import { BASE_HIT_SCORE, COMBO_WINDOW_MS, CRITICAL_BONUS, GOLDEN_BONUS, angerMood, comboMultiplier } from "@/utils/scoring";
import { useAudio } from "@/hooks/useAudio";

export type Phase = "MENU" | "PLAYING" | "LEVEL_COMPLETE" | "GAME_COMPLETE";

export type CharacterState =
  | "idle"
  | "hit-small"
  | "hit-medium"
  | "hit-big"
  | "angry"
  | "look-back"
  | "cover"
  | "jump"
  | "dodge-left"
  | "dodge-right"
  | "crouch"
  | "turn-around"
  | "run"
  | "celebrate";

export type Effect = {
  id: number;
  kind: "comic" | "score" | "burst";
  x: number;
  y: number;
  text?: string;
  rot: number;
  scale: number;
  golden?: boolean;
  critical?: boolean;
};

export type LevelStats = { hits: number; score: number; bestCombo: number; criticals: number };

const STORE_KEY = "ouch-ouch-save-v1";

type Save = {
  bestScore: number;
  highestLevel: number;
  bestCombo: number;
  totalLifetimeHits: number;
  reactionsFound: string[];
  soundEnabled: boolean;
};

const DEFAULT_SAVE: Save = {
  bestScore: 0,
  highestLevel: 1,
  bestCombo: 0,
  totalLifetimeHits: 0,
  reactionsFound: [],
  soundEnabled: true,
};

function loadSave(): Save {
  if (typeof window === "undefined") return DEFAULT_SAVE;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? { ...DEFAULT_SAVE, ...(JSON.parse(raw) as Partial<Save>) } : DEFAULT_SAVE;
  } catch {
    return DEFAULT_SAVE;
  }
}

const HIT_STATES: CharacterState[] = ["hit-small", "hit-medium", "hit-big", "jump", "look-back", "cover"];

export function useGameState() {
  const [save, setSave] = useState<Save>(DEFAULT_SAVE);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<Phase>("MENU");
  const [levelId, setLevelId] = useState(1);
  const [score, setScore] = useState(0);
  const [levelStats, setLevelStats] = useState<LevelStats>({ hits: 0, score: 0, bestCombo: 0, criticals: 0 });
  const [totals, setTotals] = useState<LevelStats>({ hits: 0, score: 0, bestCombo: 0, criticals: 0 });
  const [combo, setCombo] = useState(0);
  const [anger, setAnger] = useState(0);
  const [charState, setCharState] = useState<CharacterState>("idle");
  const [offsetX, setOffsetX] = useState(0);
  const [effects, setEffects] = useState<Effect[]>([]);
  const [shake, setShake] = useState(0);
  const [flash, setFlash] = useState(false);
  const [dim, setDim] = useState(false);
  const [slowmo, setSlowmo] = useState(false);
  const [golden, setGolden] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [frozen, setFrozen] = useState(false);

  const lastHitAt = useRef(0);
  const idRef = useRef(1);
  const timers = useRef<number[]>([]);
  const lastReactions = useRef<string[]>([]);
  const nextGolden = useRef(randInt(20, 40));
  const stateTimer = useRef<number | null>(null);
  const level = getLevel(levelId);
  const { play } = useAudio(save.soundEnabled);

  useEffect(() => {
    setSave(loadSave());
    setHydrated(true);
  }, []);

  const persist = useCallback((patch: Partial<Save>) => {
    setSave((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const t = window.setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t);
      fn();
    }, ms);
    timers.current.push(t);
    return t;
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    },
    [],
  );

  const setCharTemp = useCallback(
    (s: CharacterState, ms = 220) => {
      setCharState(s);
      if (stateTimer.current) window.clearTimeout(stateTimer.current);
      stateTimer.current = window.setTimeout(() => setCharState("idle"), ms);
    },
    [],
  );

  const pushEffect = useCallback((e: Omit<Effect, "id">) => {
    const id = idRef.current++;
    setEffects((prev) => [...prev.slice(-11), { ...e, id }]);
    window.setTimeout(() => setEffects((prev) => prev.filter((x) => x.id !== id)), 900);
  }, []);

  const unlock = useCallback(
    (name: string) => {
      setSave((prev) => {
        if (prev.reactionsFound.includes(name)) return prev;
        const next = { ...prev, reactionsFound: [...prev.reactionsFound, name] };
        try {
          window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const pickReaction = useCallback(() => {
    for (let i = 0; i < 6; i++) {
      const rarity = weightedPick(RARITY_WEIGHTS);
      const text = pick(REACTION_POOLS[rarity]);
      const recent = lastReactions.current;
      if (!(recent.length >= 2 && recent[0] === text && recent[1] === text)) {
        lastReactions.current = [text, ...recent].slice(0, 2);
        return { text, rarity };
      }
    }
    return { text: "OUCH!", rarity: "common" as const };
  }, []);

  const startLevel = useCallback(
    (id: number) => {
      setLevelId(id);
      setLevelStats({ hits: 0, score: 0, bestCombo: 0, criticals: 0 });
      setCombo(0);
      setAnger(0);
      setOffsetX(0);
      setGolden(false);
      setFrozen(false);
      setDim(false);
      setCharState("idle");
      setBanner(null);
      nextGolden.current = randInt(20, 40);
      setPhase("PLAYING");
      persist({ highestLevel: Math.max(loadSave().highestLevel, id) });
    },
    [persist],
  );

  const startGame = useCallback(() => {
    setScore(0);
    setTotals({ hits: 0, score: 0, bestCombo: 0, criticals: 0 });
    play("click");
    startLevel(1);
  }, [play, startLevel]);

  const finishLevel = useCallback(
    (stats: LevelStats) => {
      play("level-complete");
      setPhase("LEVEL_COMPLETE");
      setCharState("turn-around");
      setBanner(levelId === 1 ? "WHAT ARE YOU DOING?!" : levelId === 5 ? "OOOOOOOUCH!!!" : "STOP IT!");
      setShake(levelId === 5 ? 18 : 6);
      after(500, () => setShake(0));
      setTotals((prev) => ({
        hits: prev.hits + stats.hits,
        score: prev.score + stats.score,
        bestCombo: Math.max(prev.bestCombo, stats.bestCombo),
        criticals: prev.criticals + stats.criticals,
      }));
      if (levelId === 5) {
        unlock("Ouch Master");
        after(1400, () => setPhase("GAME_COMPLETE"));
      }
    },
    [after, levelId, play, unlock],
  );

  const registerMiss = useCallback(() => {
    if (phase !== "PLAYING") return;
    setCombo(0);
    setCharTemp("look-back", 300);
  }, [phase, setCharTemp]);

  const registerHit = useCallback(
    (x: number, y: number) => {
      if (phase !== "PLAYING" || frozen) return;

      // dodge
      if (chance(level.dodgeChance)) {
        const dir = chance(0.5) ? "dodge-left" : "dodge-right";
        setCharTemp(dir, 320);
        setCombo(0);
        unlock(dir === "dodge-left" ? "Crouch Dodge" : "Fake Out");
        pushEffect({ kind: "comic", x, y, text: "MISSED!", rot: rand(-10, 10), scale: 0.9 });
        return;
      }

      const now = performance.now();
      const nextCombo = now - lastHitAt.current < COMBO_WINDOW_MS ? combo + 1 : 1;
      lastHitAt.current = now;

      const isGolden = golden;
      const isCritical = !isGolden && chance(0.05);
      const mult = comboMultiplier(nextCombo);
      const gained = Math.round(BASE_HIT_SCORE * mult) + (isCritical ? CRITICAL_BONUS : 0) + (isGolden ? GOLDEN_BONUS : 0);

      setCombo(nextCombo);
      setScore((s) => s + gained);
      setLevelStats((prev) => {
        const stats = {
          hits: prev.hits + 1,
          score: prev.score + gained,
          bestCombo: Math.max(prev.bestCombo, nextCombo),
          criticals: prev.criticals + (isCritical ? 1 : 0),
        };
        if (stats.hits >= level.requiredHits) after(0, () => finishLevel(stats));
        return stats;
      });

      // anger
      setAnger((a) => {
        const next = Math.min(100, a + (level.boss ? 4 : 3));
        if (next >= 100) {
          setCharState("turn-around");
          setBanner("THAT'S IT!");
          setShake(14);
          setFrozen(true);
          unlock("Angry Point");
          after(900, () => {
            setBanner(null);
            setShake(0);
            setFrozen(false);
            setCharState("idle");
          });
          return 25;
        }
        return next;
      });

      // reaction visuals
      const reaction = isGolden ? { text: "GOLDEN OUCH!" } : isCritical ? { text: "CRITICAL OUCH!" } : pickReaction();
      pushEffect({
        kind: "comic",
        x,
        y,
        text: reaction.text,
        rot: rand(-12, 12),
        scale: isGolden ? 1.5 : isCritical ? 1.35 : nextCombo >= 5 ? 1.15 : 1,
        golden: isGolden,
        critical: isCritical,
      });
      pushEffect({ kind: "score", x: x + rand(-14, 14), y, text: `+${gained}`, rot: rand(-6, 6), scale: 1, golden: isGolden });
      pushEffect({ kind: "burst", x, y, rot: rand(0, 360), scale: isCritical || isGolden ? 1.5 : 1 });

      // character animation
      let nextState: CharacterState = "hit-small";
      if (isGolden || isCritical || nextCombo >= 20) nextState = "hit-big";
      else if (nextCombo >= 10) nextState = "hit-medium";
      else nextState = pick(HIT_STATES.slice(0, 3));
      if (chance(0.08)) nextState = pick(HIT_STATES.slice(3));
      setCharTemp(nextState, nextState === "jump" ? 300 : 200);
      unlock(nextState === "jump" ? "Big Jump" : nextState === "look-back" ? "Look Back" : nextState === "cover" ? "Cover Backside" : "Normal Ouch");

      // camera / audio
      let shakeAmount = nextCombo >= 20 ? 10 : nextCombo >= 10 ? 5 : 1.5;
      if (isCritical) shakeAmount = Math.max(shakeAmount, 9);
      if (isGolden) shakeAmount = Math.max(shakeAmount, 12);
      setShake(shakeAmount);
      after(180, () => setShake(0));

      play(isGolden ? "golden" : isCritical ? "critical" : "ouch");
      if (nextCombo % 5 === 0 && nextCombo >= 5) play("combo");
      if (isCritical) {
        unlock("Critical Ouch");
        setFlash(true);
        after(120, () => setFlash(false));
      }
      if (isGolden) {
        unlock("Golden Ouch");
        setGolden(false);
      }
      if (nextCombo === 10) unlock("Combo x10");
      if (nextCombo === 20) unlock("Combo x20");
      if (nextCombo === 30) {
        unlock("Combo x30");
        setBanner("MEGA OUCH!");
        after(700, () => setBanner(null));
      }
      if (nextCombo === 50) {
        unlock("Combo x50");
        setBanner("MEGA OUCH!!!");
        after(900, () => setBanner(null));
      }

      // slow motion rare
      if (chance(0.02)) {
        unlock("Slow Motion Ouch");
        setSlowmo(true);
        setBanner("OOOOOOUUUUCH!");
        after(1000, () => {
          setSlowmo(false);
          setBanner(null);
        });
      }

      // golden schedule
      setLevelStats((prev) => {
        if (prev.hits >= nextGolden.current && !golden) {
          nextGolden.current = prev.hits + randInt(20, 40);
          setGolden(true);
          after(1000, () => setGolden(false));
        }
        return prev;
      });
    },
    [after, combo, finishLevel, frozen, golden, level, phase, pickReaction, play, pushEffect, setCharTemp, unlock],
  );

  // combo decay
  useEffect(() => {
    if (phase !== "PLAYING" || combo === 0) return;
    const t = window.setInterval(() => {
      if (performance.now() - lastHitAt.current > COMBO_WINDOW_MS) setCombo(0);
    }, 200);
    return () => window.clearInterval(t);
  }, [combo, phase]);

  // movement
  useEffect(() => {
    if (phase !== "PLAYING" || level.movementSpeed === 0) return;
    const interval = Math.max(700, 2200 / level.movementSpeed);
    const t = window.setInterval(() => {
      setOffsetX(rand(-1, 1) * 34 * level.movementSpeed);
      if (chance(0.25)) setCharTemp(chance(0.5) ? "look-back" : "crouch", 400);
    }, interval);
    return () => window.clearInterval(t);
  }, [level.movementSpeed, phase, setCharTemp]);

  // chaos events
  useEffect(() => {
    if (phase !== "PLAYING" || !level.chaosEvents) return;
    const t = window.setInterval(() => {
      const event = randInt(0, 4);
      if (event === 0) {
        setFrozen(true);
        setCharState("turn-around");
        setBanner("Don't even think about it.");
        unlock("Freeze Stare");
        after(1100, () => {
          setFrozen(false);
          setCharState("idle");
          setBanner(null);
        });
      } else if (event === 1) {
        setDim(true);
        after(1200, () => setDim(false));
      } else if (event === 2) {
        setShake(8);
        after(400, () => setShake(0));
      } else if (event === 3) {
        setCharTemp("run", 600);
        setOffsetX(rand(-1, 1) * 60);
        unlock("Run Away");
      } else {
        setCharTemp("spin" in {} ? "idle" : "crouch", 500);
      }
    }, 6000);
    return () => window.clearInterval(t);
  }, [after, level.chaosEvents, phase, setCharTemp, unlock]);

  // rage mode
  const rage = anger >= 80;

  // save bests
  useEffect(() => {
    if (phase !== "LEVEL_COMPLETE" && phase !== "GAME_COMPLETE") return;
    persist({
      bestScore: Math.max(save.bestScore, score),
      bestCombo: Math.max(save.bestCombo, levelStats.bestCombo),
      totalLifetimeHits: save.totalLifetimeHits + levelStats.hits,
      highestLevel: Math.max(save.highestLevel, levelId),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const nextLevel = useCallback(() => {
    play("click");
    if (levelId >= LEVELS.length) setPhase("GAME_COMPLETE");
    else startLevel(levelId + 1);
  }, [levelId, play, startLevel]);

  const replayLevel = useCallback(() => {
    play("click");
    startLevel(levelId);
  }, [levelId, play, startLevel]);

  const toMenu = useCallback(() => {
    play("click");
    setPhase("MENU");
    setCharState("idle");
  }, [play]);

  const toggleSound = useCallback(() => persist({ soundEnabled: !save.soundEnabled }), [persist, save.soundEnabled]);

  return {
    hydrated,
    save,
    phase,
    level,
    levelId,
    score,
    levelStats,
    totals,
    combo,
    anger,
    mood: angerMood(anger),
    charState,
    offsetX,
    effects,
    shake,
    flash,
    dim,
    slowmo,
    golden,
    banner,
    rage,
    reactionsCount: save.reactionsFound.length,
    totalReactions: SECRET_REACTIONS.length,
    startGame,
    registerHit,
    registerMiss,
    nextLevel,
    replayLevel,
    toMenu,
    toggleSound,
  };
}
