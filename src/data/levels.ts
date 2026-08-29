export type LevelConfig = {
  id: number;
  name: string;
  requiredHits: number;
  dodgeChance: number;
  movementSpeed: number;
  chaosEvents: boolean;
  boss: boolean;
};

export const LEVELS: LevelConfig[] = [
  { id: 1, name: "First Ouch", requiredHits: 20, dodgeChance: 0, movementSpeed: 0, chaosEvents: false, boss: false },
  { id: 2, name: "Don't Touch Me", requiredHits: 35, dodgeChance: 0.1, movementSpeed: 1, chaosEvents: false, boss: false },
  { id: 3, name: "Combo Chaos", requiredHits: 50, dodgeChance: 0.15, movementSpeed: 1.2, chaosEvents: false, boss: false },
  { id: 4, name: "Chaos Room", requiredHits: 70, dodgeChance: 0.2, movementSpeed: 1.4, chaosEvents: true, boss: false },
  { id: 5, name: "Ouch Boss", requiredHits: 100, dodgeChance: 0.25, movementSpeed: 1.6, chaosEvents: true, boss: true },
];

export const getLevel = (id: number) => LEVELS.find((l) => l.id === id) ?? LEVELS[0]!;
