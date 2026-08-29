export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type Reaction = { text: string; rarity: Rarity };

export const REACTION_POOLS: Record<Rarity, string[]> = {
  common: ["OUCH!", "OW!", "HEY!", "STOP!", "BRO!", "AAAH!"],
  uncommon: ["AGAIN?!", "SERIOUSLY?!", "BRO?!", "WHY?!", "RUDE!"],
  rare: ["NOT AGAIN!", "MY BACK!", "LEAVE ME ALONE!", "WHAT IS WRONG WITH YOU?!"],
  legendary: ["OOOOOOUUUUCH!", "I QUIT!", "CALL MY LAWYER!"],
};

export const RARITY_WEIGHTS: Array<[Rarity, number]> = [
  ["common", 70],
  ["uncommon", 23],
  ["rare", 6],
  ["legendary", 1],
];

export const SECRET_REACTIONS = [
  "Normal Ouch",
  "Big Jump",
  "Look Back",
  "Angry Point",
  "Cover Backside",
  "Spin",
  "Run Away",
  "Mega Ouch",
  "Critical Ouch",
  "Golden Ouch",
  "Slow Motion Ouch",
  "Freeze Stare",
  "Fake Out",
  "Crouch Dodge",
  "Rage Mode",
  "Combo x10",
  "Combo x20",
  "Combo x30",
  "Combo x50",
  "Ouch Master",
] as const;

export type SecretReaction = (typeof SECRET_REACTIONS)[number];
