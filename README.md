# Ouch Fest

Act as a senior frontend game developer, UI/UX designer, 2D browser-game engineer, and React developer.

I want you to BUILD a complete working browser game called:

"OUCH OUCH GAME"

This is NOT a normal landing page.

It must be a real interactive mini-game that works on both desktop and mobile.

I have provided a reference image. Analyze its GENERAL GAMEPLAY COMPOSITION and recreate that type of experience using ORIGINAL artwork, original character styling, original animations, and original UI.

Do not copy the exact person, copyrighted artwork, social-media interface, branding, or assets from the reference image.

==================================================

1. MAIN CONCEPT

==================================================

The game is extremely simple:

A funny cartoon male character stands/bends forward in the center of a cartoon room.

The player taps/clicks the character's BACKSIDE.

When the correct area is hit:

1. Character immediately reacts.

2. Character jumps/moves/shakes.

3. Play a funny "OUCH!" reaction sound if audio assets are available.

4. Show animated comic text such as:

   OUCH!

   OW!

   HEY!

   STOP!

   BRO!

5. Increase score.

6. Increase combo.

7. Increase anger meter.

8. Trigger particles/impact effects.

The core experience should feel:

Funny

Fast

Responsive

Simple

Addictive

Mobile friendly

Meme-like

The player should understand the game within 2 seconds.

==================================================

2. IMPORTANT VISUAL STRUCTURE

==================================================

Create a vertical mobile-first game screen inspired by the supplied reference composition.

GAME AREA:

- 9:16 vertical composition

- cartoon room

- strong perspective

- orange/warm wooden floor

- peach/orange/light warm walls

- large central window on rear wall

- side walls narrowing toward rear

- playful comic-game atmosphere

Character should be positioned around the center/lower-middle of the game.

Character should be large enough that tapping is easy.

Place comic "OUCH!" graphics on the left and right walls.

Do NOT create a realistic violent game.

Everything must feel like harmless exaggerated cartoon comedy.

Use an ORIGINAL fictional cartoon character.

Suggested character:

- adult male

- long dark hair

- beard

- exaggerated funny facial expressions

- colorful casual shirt

- shorts

- sneakers

- stylized 2D/cartoon appearance

Do not copy the exact person from the reference image.

==================================================

3. RESPONSIVE DESIGN

==================================================

MOBILE FIRST.

Primary game aspect ratio:

9:16

Optimize for:

360x640

375x667

390x844

393x852

412x915

430x932

On desktop:

Center the vertical game canvas on the screen.

Do NOT stretch the gameplay scene horizontally.

Example:

desktop background | vertical game | desktop background

The game itself should maintain the same portrait composition.

==================================================

4. HOME SCREEN

==================================================

Create a clean opening screen.

Show:

OUCH OUCH

subtitle:

"The Most Pointless Game You'll Keep Playing"

Large:

TAP TO PLAY

Also show:

Best Score

Highest Level

Sound On/Off

Character can perform a small idle animation in the background.

Do NOT create a large traditional website navbar.

This should feel like opening a mobile game.

==================================================

5. GAME HUD

==================================================

Keep HUD minimal.

TOP LEFT:

LEVEL 1

TOP CENTER:

Score

TOP RIGHT:

sound button

Optional second row:

Anger meter

Example:

LEVEL 2       1,250       🔊

ANGER

██████░░░░

At the bottom or lower side:

HITS: 23

COMBO x7

Do NOT cover the character with excessive UI.

==================================================

6. CORE HIT DETECTION

==================================================

This is VERY IMPORTANT.

Do NOT make the entire character clickable.

Create a dedicated invisible target/hitbox around the backside area.

Successful backside click/tap:

+10 score

+1 hit

increase combo

increase anger

play reaction

show comic text

impact effect

Clicking another part of the character should NOT count as a successful hit.

However, make the backside hitbox slightly forgiving for mobile users.

Use pointer/touch events so the same system works with:

mouse

touchscreen

trackpad

The feedback should feel immediate.

Target response latency should feel under roughly 100ms.

==================================================

7. CHARACTER STATES

==================================================

Create a reusable Character component/system.

Character states:

idle

hit-small

hit-medium

hit-big

angry

look-back

cover-backside

jump

dodge-left

dodge-right

crouch

turn-around

run

celebration/final reaction

If proper sprite animations are not available yet, create convincing CSS/DOM transforms so the prototype still feels animated.

For example:

small hit:

translateY(-8px)

rotate(3deg)

medium:

translateY(-16px)

rotate(-6deg)

strong:

translateY(-30px)

rotate(10deg)

scale(1.05)

Use spring/bounce-like animations.

Animations should finish quickly so tapping can continue rapidly.

==================================================

8. RANDOM REACTION ENGINE

==================================================

Do NOT trigger the same reaction repeatedly.

Create reaction pools.

COMMON:

OUCH!

OW!

HEY!

STOP!

UNCOMMON:

AGAIN?!

SERIOUSLY?!

BRO?!

WHY?!

RARE:

NOT AGAIN!

MY BACK!

WHAT IS WRONG WITH YOU?!

LEAVE ME ALONE!

Create weighted randomness.

Example:

70% common

23% uncommon

6% rare

1% legendary

Do not allow the same reaction more than twice consecutively.

==================================================

9. COMBO SYSTEM

==================================================

Create a combo system.

If another successful hit occurs within approximately:

1.2 seconds

increase combo.

Otherwise reset combo to 1.

Example:

x2

x3

x5

x10

x20

x30

x50

Make higher combinations progressively more dramatic.

x5:

larger impact text

x10:

camera bump

x20:

screen shake

x30:

special character reaction

x50:

crazy "MEGA OUCH" reaction

Score multiplier example:

combo 1-4 = x1

combo 5-9 = x1.25

combo 10-19 = x1.5

combo 20-29 = x2

combo 30+ = x3

Keep scoring understandable.

==================================================

10. CRITICAL OUCH

==================================================

Each successful tap should have approximately a:

5% chance

of creating:

CRITICAL OUCH!

Effects:

large impact graphic

stronger character animation

screen shake

bonus score

special sound

floating +100 text

Display:

CRITICAL OUCH

+100

This should feel rare and satisfying.

==================================================

11. ANGER SYSTEM

==================================================

Create an anger meter from:

0–100

Every successful hit increases anger slightly.

Character mood changes according to anger.

0–20:

confused

21–40:

annoyed

41–60:

angry

61–80:

very angry

81–100:

furious

Change facial expression / character state where possible.

At 100:

trigger a special reaction.

Example:

character turns around

points toward player

large:

"THAT'S IT!"

Then anger resets partially or level-specific logic continues.

==================================================

12. FIVE LEVELS

==================================================

Create exactly 5 playable levels.

----------------------------------

LEVEL 1 — FIRST OUCH

----------------------------------

Target:

20 successful hits

Character mostly stays still.

Purpose:

teach the mechanic.

Difficulty:

very easy.

At completion:

Character turns toward player.

Text:

"WHAT ARE YOU DOING?!"

Then:

LEVEL COMPLETE

----------------------------------

LEVEL 2 — DON'T TOUCH ME

----------------------------------

Target:

35 successful hits

Character occasionally moves:

left

right

small crouch

looks behind

Small dodge probability.

Approximately:

10% dodge chance.

----------------------------------

LEVEL 3 — COMBO CHAOS

----------------------------------

Target:

50 successful hits

Focus on combos.

Character moves more often.

Enable:

combo effects

camera shake

critical hits

larger reaction variety

Approximately:

15% dodge chance.

----------------------------------

LEVEL 4 — CHAOS ROOM

----------------------------------

Target:

70 successful hits

Introduce random comedy events.

Possible events:

character suddenly turns around

character crouches

character moves rapidly

room briefly shakes

fake target appears

lights dim for 1–2 seconds

golden target appears

huge OUCH event

Do NOT make the level frustrating.

----------------------------------

LEVEL 5 — OUCH BOSS

----------------------------------

Target:

100 successful hits

Combine all mechanics.

Character:

dodges

moves

turns

crouches

covers backside

runs temporarily

performs fake-outs

Maximum dodge probability should remain around:

25%

The player should still have fun.

Show:

ANGER / BOSS METER

At completion:

trigger a huge final sequence.

Screen shake

comic explosion

stars

character jumps/runs away

large:

OOOOOOOUCH!!!

Then:

OUCH MASTER!

==================================================

13. GOLDEN OUCH

==================================================

Add a rare bonus event.

Approximately every 20–40 successful taps:

backside target briefly glows for around:

1 second.

If clicked during this window:

GOLDEN OUCH!

+500 points

special particles

special sound

larger animation

If missed:

game simply continues.

==================================================

14. SECRET REACTIONS

==================================================

Create a secret reaction collection.

Track:

REACTIONS FOUND

0 / 20

Examples:

1. Normal Ouch

2. Big Jump

3. Look Back

4. Angry Point

5. Cover Backside

6. Spin

7. Run Away

8. Mega Ouch

9. Critical Ouch

10. Golden Ouch

etc.

Some reactions should have rare probabilities.

This gives players a reason to replay.

==================================================

15. FUNNY EVENTS

==================================================

Random optional funny events can occur.

Use them sparingly.

Examples:

CHARACTER FREEZE

Character suddenly freezes and looks toward player.

Text:

"Don't even think about it."

----------------------------------

FAKE OUT

Character moves just before tap.

----------------------------------

WRONG TARGET

Temporary decoy target appears.

----------------------------------

SLOW MOTION OUCH

Rare successful hit triggers approximately 1 second slow-motion animation.

Display:

OOOOOOUUUUCH!

----------------------------------

RAGE MODE

When anger is very high:

room slightly shakes

character movements become faster

==================================================

16. IMPACT EFFECTS

==================================================

Every successful tap should generate feedback.

Possible effects:

small comic burst

star particles

floating +10

OUCH text

character squash/stretch

short camera bump

Create reusable components/functions for:

ImpactBurst

FloatingScore

ComicText

ScreenShake

Do NOT create graphic injury or gore.

==================================================

17. COMIC TEXT SYSTEM

==================================================

Generate animated text close to the hit point.

Examples:

OUCH!

OW!

HEY!

STOP!

BRO!

OUCH!!

AAAAH!

Animation:

scale 0.5 → 1.2 → 1

slight rotation

rise upward

fade out

Randomize rotation approximately:

-12° to +12°

Randomize positioning slightly.

Multiple rapid taps may create multiple floating texts, but cap the number to avoid performance problems.

==================================================

18. CAMERA EFFECTS

==================================================

Implement subtle screen/canvas shake.

Normal hit:

almost none

Combo x10:

small

Combo x20:

medium

Critical:

medium

Level 5 final:

large

Do not make players motion sick.

Respect prefers-reduced-motion if possible.

==================================================

19. SOUND ARCHITECTURE

==================================================

Create a reusable sound manager.

Sound categories:

ouch voice

impact

combo

critical

golden

level complete

button click

If actual audio files aren't available, structure the implementation so files can easily be placed inside:

/public/audio/

Examples:

ouch-01.mp3

ouch-02.mp3

ouch-03.mp3

hey-01.mp3

stop-01.mp3

critical.mp3

combo.mp3

level-complete.mp3

The game must continue working even when files are missing.

Do NOT throw errors if sound files aren't present.

Create a sound toggle.

==================================================

20. LEVEL COMPLETE SCREEN

==================================================

After every level, temporarily stop gameplay.

Show:

LEVEL COMPLETE!

Hits:

Score:

Best Combo:

Critical Ouches:

Buttons:

NEXT LEVEL

REPLAY LEVEL

Make NEXT LEVEL the primary button.

==================================================

21. FINAL GAME COMPLETE SCREEN

==================================================

After Level 5:

display:

OUCH MASTER!

TOTAL SCORE

TOTAL HITS

BEST COMBO

CRITICAL OUCHES

REACTIONS FOUND

Buttons:

PLAY AGAIN

RESTART

Optional:

COPY SCORE

If browser clipboard support is not appropriate, omit it.

==================================================

22. LOCAL PROGRESS

==================================================

Persist basic progression using browser localStorage.

Store:

bestScore

highestLevel

bestCombo

totalLifetimeHits

reactionsFound

soundEnabled

The game should still work if storage isn't available.

==================================================

23. UI STYLE

==================================================

Visual direction:

2D cartoon

comic book

playful

slightly exaggerated

high contrast

clean

bright

mobile-game aesthetic

Avoid:

generic SaaS design

dashboard style

glassmorphism everywhere

corporate cards

gradient-heavy landing pages

huge navigation bars

This should look like a GAME.

Use bold comic-inspired headings.

Round game buttons.

Large mobile touch targets.

==================================================

24. ROOM DESIGN

==================================================

Create the room primarily with CSS/SVG/HTML layers so the game works without external images.

Structure:

back wall

large central window

left wall

right wall

wooden perspective floor

Suggested palette:

warm peach walls

orange wooden floor

dark reddish-brown trim

light blue window panes

comic-red OUCH wall text

cream/off-white UI highlights

Use perspective lines in the floor to make the room feel deeper.

==================================================

25. CHARACTER PLACEHOLDER

==================================================

Until final custom artwork is added, build an ORIGINAL stylized character using:

CSS shapes,

SVG,

or a temporary original cartoon illustration.

The implementation should make replacing the character later easy.

Recommended structure:

Character/

  body

  head

  hair

  beard

  shirt

  shorts

  legs

  shoes

  hitbox

Do NOT use random stock photography.

Do NOT use the actual person from my reference image.

==================================================

26. CODE ARCHITECTURE

==================================================

Use:

React

TypeScript

Vite

Tailwind CSS

Do not introduce a backend.

Do not use Supabase.

Do not require authentication.

Suggested architecture:

src/

  components/

    Game/

      GameCanvas.tsx

      Character.tsx

      Room.tsx

      GameHUD.tsx

      ComicText.tsx

      ImpactBurst.tsx

      FloatingScore.tsx

      AngerMeter.tsx

      LevelComplete.tsx

      GameComplete.tsx

  hooks/

      useGameState.ts

      useCombo.ts

      useAudio.ts

  data/

      levels.ts

      reactions.ts

  utils/

      scoring.ts

      random.ts

  pages/

      Index.tsx

Use reusable systems instead of putting all game logic into one giant component.

==================================================

27. GAME STATE

==================================================

Use clear game states:

MENU

PLAYING

LEVEL_COMPLETE

GAME_COMPLETE

PAUSED

Important state:

currentLevel

score

levelScore

hits

combo

bestCombo

anger

criticalCount

goldenTargetActive

characterState

reaction

reactionsFound

==================================================

28. LEVEL CONFIGURATION

==================================================

Create levels as data instead of hardcoding separate logic everywhere.

Example concept:

[

 {

   id: 1,

   name: "First Ouch",

   requiredHits: 20,

   dodgeChance: 0,

   movementSpeed: 0

 },

 {

   id: 2,

   name: "Don't Touch Me",

   requiredHits: 35,

   dodgeChance: 0.10,

   movementSpeed: 1

 },

 {

   id: 3,

   name: "Combo Chaos",

   requiredHits: 50,

   dodgeChance: 0.15,

   movementSpeed: 1.2

 },

 {

   id: 4,

   name: "Chaos Room",

   requiredHits: 70,

   dodgeChance: 0.20,

   movementSpeed: 1.4

 },

 {

   id: 5,

   name: "Ouch Boss",

   requiredHits: 100,

   dodgeChance: 0.25,

   movementSpeed: 1.6

 }

]

==================================================

29. PERFORMANCE

==================================================

This is a rapid tap game.

Therefore:

Avoid expensive rerenders.

Do not create unlimited particles.

Limit active comic text effects.

Clear timers properly.

Prevent duplicate event listeners.

Animations must remain smooth on mobile.

Target approximately:

60 FPS.

==================================================

30. INPUT RULES

==================================================

Use pointer events.

Support:

pointerdown

This provides faster interaction than waiting for click on some devices.

Prevent accidental:

text selection

image dragging

inside the game area.

Do NOT disable normal browser scrolling outside the game unnecessarily.

==================================================

31. IMPORTANT GAME FEEL

==================================================

A successful tap should feel satisfying.

Sequence:

PLAYER TAP

↓

instant impact

↓

character movement

↓

comic OUCH

↓

+points

↓

sound

↓

combo

↓

anger

All of these should feel almost simultaneous.

The game should NEVER feel like:

tap

wait

animation

wait

tap again

Players should be able to tap rapidly.

==================================================

32. FIRST VERSION REQUIREMENTS

==================================================

The first generated version MUST ALREADY BE PLAYABLE.

Do not only create:

a mockup

a PRD

static cards

placeholder buttons

coming soon features

Actually implement the game logic.

At minimum I must be able to:

open game

press PLAY

see character

tap backside

get score

see OUCH animation

build combo

complete Level 1

continue through all 5 levels

finish game

restart

==================================================

33. DO NOT ADD

==================================================

Do NOT add:

authentication

login

signup

database

payments

shop

multiplayer

leaderboard backend

chat

large footer

blog

pricing page

marketing pages

We are building a simple viral mini-game.

==================================================

34. POLISH

==================================================

Add polished details:

button press animation

character idle breathing

blinking

small room ambient movement

combo pulse

score number bump animation

smooth level transitions

screen flash on critical hit

confetti/comic stars on level completion

Keep effects lightweight.

==================================================

35. ACCESSIBILITY

==================================================

Provide:

sound toggle

keyboard accessible primary UI buttons

clear contrast

reduced-motion support where reasonable

Desktop users should also be able to hit the target with mouse.

==================================================

36. FINAL ACCEPTANCE TEST

==================================================

Before considering the implementation complete, verify:

TEST 1

Opening the page displays the game home screen.

TEST 2

PLAY starts Level 1.

TEST 3

Clicking outside the backside does not score.

TEST 4

Clicking the backside gives points.

TEST 5

Repeated fast hits create combos.

TEST 6

Reaction text changes randomly.

TEST 7

Anger meter increases.

TEST 8

Level ends after required hits.

TEST 9

NEXT LEVEL loads correct next level.

TEST 10

All five levels are playable.

TEST 11

Level 5 completion displays OUCH MASTER.

TEST 12

PLAY AGAIN resets correctly.

TEST 13

Mobile layout works without horizontal overflow.

TEST 14

Desktop keeps vertical game composition.

TEST 15

Missing audio assets do not crash the application.

TEST 16

Rapid tapping does not break animations or scoring.

==================================================

37. MOST IMPORTANT INSTRUCTION

==================================================

Do not overengineer this game.

The fun comes from:

TAP

→ OUCH

→ FUNNY REACTION

→ SCORE

→ COMBO

→ increasingly angry character

Keep the controls extremely simple while making the reactions increasingly ridiculous.

The attached reference image should guide the GENERAL composition:

cartoon room

vertical screen

large central character

backside tapping mechanic

comic OUCH atmosphere

But create a completely original implementation and original visual assets.

Start by building the complete playable version now.

Do not stop after explaining what you plan to build.

create the person according to my attach picture donot change the persons face and the person is standing like this and the back of this man also stay in this position

Implement it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c4f14ec-d98c-4a47-806a-f493f8eceb6a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
