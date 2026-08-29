export const BASE_HIT_SCORE = 10;
export const CRITICAL_BONUS = 100;
export const GOLDEN_BONUS = 500;

export function comboMultiplier(combo: number): number {
  if (combo >= 30) return 3;
  if (combo >= 20) return 2;
  if (combo >= 10) return 1.5;
  if (combo >= 5) return 1.25;
  return 1;
}

export function angerMood(anger: number): string {
  if (anger <= 20) return "CONFUSED";
  if (anger <= 40) return "ANNOYED";
  if (anger <= 60) return "ANGRY";
  if (anger <= 80) return "VERY ANGRY";
  return "FURIOUS";
}

export const COMBO_WINDOW_MS = 1200;
