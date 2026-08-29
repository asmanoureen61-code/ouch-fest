import { createFileRoute } from "@tanstack/react-router";
import { GameCanvas } from "@/components/Game/GameCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ouch Ouch Game — Tap, Score, Combo" },
      {
        name: "description",
        content:
          "Ouch Ouch is a fast cartoon tap game: hit the target, build combos, enrage the character and clear all 5 levels to become Ouch Master.",
      },
      { property: "og:title", content: "Ouch Ouch Game — Tap, Score, Combo" },
      {
        property: "og:description",
        content: "A pointless, addictive cartoon tap game. Build combos, land critical ouches, beat 5 levels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <h1 className="sr-only">Ouch Ouch Game</h1>
      <GameCanvas />
    </main>
  );
}
