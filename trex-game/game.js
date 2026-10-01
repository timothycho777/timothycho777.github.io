// ================= SETUP =================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;   // keeps pixel art crisp

const player = new Image();
player.src = "images/player.png";

// Cactus pictures: one short, one tall (transparent PNGs)
const cactusShortImg = new Image();
cactusShortImg.src = "images/cactus-short.png";
const cactusTallImg = new Image();
cactusTallImg.src = "images/cactus-tall.png";

// Desert floor tile (one canvas wide, repeats seamlessly)
const floorImg = new Image();
floorImg.src = "images/desert-floor.png";

const allImages = [player, cactusShortImg, cactusTallImg, floorImg];
allImages.forEach(function (img) {
  img.onerror = function () {
    console.log("IMAGE FAILED: check " + img.src);
  };
});


// ================= SETTINGS =================
// Player
const GROUND_Y       = 170;   // y position of the ground line
const GRAVITY         = 0.6;   // pull-down per frame (same as Chrome's dino)
const JUMP_VELOCITY   = 10;    // launch speed (Chrome adds speed / 10 on top of this)
const DROP_VELOCITY   = 5;     // letting go of Space cuts the upward speed down to this
const MIN_JUMP_HEIGHT = 30;    // a tap still rises this high before the cut applies
const MAX_JUMP_HEIGHT = 63;    // holding Space: the cut applies at this height
const PLAYER_X       = 50;    // how far from the left edge he stands
const HITBOX_PADDING = 8;     // shrinks his hitbox so near-misses feel fair

// Speed (all in pixels per frame, at 60 frames per second)
const START_SPEED     = 6;       // how fast cacti move at the start (Chrome: 6)
const MAX_SPEED       = 13;      // top speed (Chrome: 13)
const ACCELERATION    = 0.001;   // speed gained every frame (Chrome: 0.001). 0 = never speeds up
const RESTART_DELAY   = 750;     // ms after a crash before restarting is allowed (Chrome: 750)

// Cacti
const CACTUS_IMAGES   = [cactusShortImg, cactusTallImg];   // each spawn picks one at random
const CACTUS_PADDING  = 4;              // shrinks each cactus hitbox (left, right, top) so near-misses feel fair
const MIN_SPAWN_GAP   = 90;             // fewest frames between cacti (1.5 seconds)
const MAX_SPAWN_GAP   = 180;            // most frames between cacti (3 seconds)

// Score
const SCORE_RATE     = 0.1;   // points added per frame (about 6 points per second)


// ================= HELPERS =================
// Returns a random whole number of frames between MIN and MAX
function randomGap() {
  return MIN_SPAWN_GAP + Math.floor(Math.random() * (MAX_SPAWN_GAP - MIN_SPAWN_GAP + 1));
}

// Returns true if Pochacco's hitbox overlaps cactus c
function hitsCactus(c) {
  // Pochacco's hitbox
  const playerLeft   = PLAYER_X + HITBOX_PADDING;
  const playerRight  = PLAYER_X + player.width - HITBOX_PADDING;
  const playerTop    = GROUND_Y - player.height - y + HITBOX_PADDING;
  const playerBottom = GROUND_Y - y;

  // Cactus hitbox (slightly smaller than the picture)
  const cactusLeft   = c.x + CACTUS_PADDING;
  const cactusRight  = c.x + c.width - CACTUS_PADDING;
  const cactusTop    = GROUND_Y - c.height + CACTUS_PADDING;
  const cactusBottom = GROUND_Y;

  // Overlap only if all four conditions are true
  return playerLeft   < cactusRight &&
         playerRight  > cactusLeft &&
         playerTop    < cactusBottom &&
         playerBottom > cactusTop;
}

// Puts everything back to how it was at the start
function resetGame() {
  y = 0;
  velocity = 0;
  jumpReleased = false;
  speed = START_SPEED;
  groundX = 0;
  gameOver = false;
  cacti = [];
  spawnTimer = 0;
  nextSpawn = randomGap();
  score = 0;
}

// Stops the game and saves a new high score if there is one
function endGame() {
  gameOver = true;
  gameOverAt = performance.now();   // used for the restart delay

  const finalScore = Math.floor(score);
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("trexHighScore", highScore);   // survives page refreshes
  }
}


// ================= STATE =================
let y = 0;                      // height above the ground (0 = standing on it)
let velocity = 0;               // up/down speed (0 = standing still)
let jumpReleased = false;       // true once Space was let go during a jump (makes it a short hop)
let speed = START_SPEED;        // how fast the cacti move left right now
let groundX = 0;                // how far the desert floor has scrolled (0 up to the tile width)
let gameOver = false;
let gameOverAt = 0;             // when the last crash happened (ms)
let started = false;            // false until the first click / Space (shows the start screen)

let cacti = [];                 // all cacti currently on screen
let spawnTimer = 0;             // frames since the last cactus appeared
let nextSpawn = randomGap();    // frames to wait before the next one

let score = 0;
let highScore = Number(localStorage.getItem("trexHighScore")) || 0;   // 0 if nothing saved yet


// ================= INPUT =================
// Start a jump (only from the ground, so no double jumps)
function startJump() {
  if (y === 0) {
    velocity = JUMP_VELOCITY + speed / 10;   // a faster game launches slightly harder (like Chrome)
    jumpReleased = false;
  }
}

// Space (or the mouse / finger) was let go: a quick tap = short hop, holding = full jump
function releaseJump() {
  if (velocity > 0) jumpReleased = true;     // only matters while still rising
}

// Space / click / tap pressed: start, restart, or jump
function pressAction() {
  if (!started) {
    started = true;                // first press starts the game (and hops, like Chrome)
    startJump();
  } else if (gameOver) {
    if (performance.now() - gameOverAt >= RESTART_DELAY) {
      resetGame();                 // after a crash, restart (not instantly, so mashing Space doesn't skip the crash)
    }
  } else {
    startJump();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();            // stops the page from scrolling
    if (!e.repeat) pressAction();  // holding the key down must not count as new presses
  }
});

document.addEventListener("keyup", function (e) {
  if (e.code === "Space") releaseJump();
});

// Click or tap on the game also works (handy on phones). Holding works too.
// Note: no preventDefault() here, because that would stop the browser from giving
// the game keyboard focus, and then Space would not work inside the homepage box.
canvas.addEventListener("pointerdown", function () {
  window.focus();
  pressAction();
});
window.addEventListener("pointerup", releaseJump);
window.addEventListener("pointercancel", releaseJump);


// ================= UPDATE (the physics) =================
function update() {
  if (!started || gameOver) return;   // wait for the first press; freeze after a crash

  // --- speed: creeps up over time, like Chrome ---
  if (speed < MAX_SPEED) speed += ACCELERATION;
  groundX = (groundX + speed) % floorImg.width;   // the floor scrolls at the same speed as the cacti

  // --- player physics ---
  y += velocity;          // move by current speed
  velocity -= GRAVITY;    // gravity slows his upward speed

  if (y < 0) {            // landed: back on the ground, stop moving
    y = 0;
    velocity = 0;
    jumpReleased = false;
  }

  // Tap vs hold. Once he has risen past MIN_JUMP_HEIGHT:
  //  - if Space was let go, cut the upward speed (short hop)
  //  - if Space is still held, the same cut happens at MAX_JUMP_HEIGHT (full jump)
  if (y >= MIN_JUMP_HEIGHT && velocity > DROP_VELOCITY && (jumpReleased || y >= MAX_JUMP_HEIGHT)) {
    velocity = DROP_VELOCITY;
  }

  // --- cacti ---
  // 1. move every cactus left
  for (const c of cacti) {
    c.x -= speed;
  }

  // 2. count frames, and add a new cactus at the right edge when it's time
  spawnTimer += 1;
  if (spawnTimer >= nextSpawn) {
    // pick a random cactus picture; its size comes from the picture itself
    const img = CACTUS_IMAGES[Math.floor(Math.random() * CACTUS_IMAGES.length)];
    cacti.push({ x: canvas.width, width: img.width, height: img.height, img: img });
    spawnTimer = 0;
    nextSpawn = randomGap();
  }

  // 3. keep only the cacti that are still on screen
  cacti = cacti.filter(function (c) {
    return c.x + c.width > 0;
  });

  // --- collision ---
  for (const c of cacti) {
    if (hitsCactus(c)) {
      endGame();
    }
  }

  // --- score (only counts while the game is still running) ---
  if (!gameOver) {
    score += SCORE_RATE;
  }
}


// ================= DRAW =================
function draw() {
  ctx.fillStyle = "#f7f7f7";       // light background (wipes the previous frame)
  ctx.fillRect(0, 0, 600, 200);

  // desert floor: two copies side by side, scrolling left (drawn first so everything stands on it)
  const fx = Math.round(groundX);
  ctx.drawImage(floorImg, -fx, GROUND_Y - 2);
  ctx.drawImage(floorImg, floorImg.width - fx, GROUND_Y - 2);

  // cacti: pictures standing on the ground
  for (const c of cacti) {
    ctx.drawImage(c.img, Math.round(c.x), GROUND_Y - c.height);
  }

  // Pochacco: feet on the ground, lifted up by y when jumping
  ctx.drawImage(player, PLAYER_X, GROUND_Y - player.height - y);

  // score, top right
  ctx.fillStyle = "#535353";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "right";
  ctx.fillText("HI " + highScore + "   " + Math.floor(score), 585, 32);

  // messages, centered on the canvas
  ctx.textAlign = "center";
  if (!started) {
    ctx.font = "bold 24px monospace";
    ctx.fillText("Click or press Space to start", 300, 100);
  } else if (gameOver) {
    ctx.font = "bold 30px monospace";
    ctx.fillText("GAME OVER", 300, 90);
    ctx.font = "18px monospace";
    ctx.fillText("Click or press Space to restart", 300, 122);
  }
  ctx.textAlign = "left";          // back to normal for the next frame
}


// ================= GAME LOOP =================
// The game logic always runs at exactly 60 steps per second, whatever the screen's refresh rate
// (a 144 Hz monitor would otherwise run the whole game 2.4x too fast).
const FRAME_MS = 1000 / 60;
let lastTime = null;
let leftover = 0;

function loop(now) {
  if (lastTime === null) lastTime = now;
  leftover += Math.min(now - lastTime, 100);   // capped so a background tab can't cause a huge jump
  lastTime = now;

  while (leftover >= FRAME_MS) {
    update();                     // 1. change the numbers
    leftover -= FRAME_MS;
  }
  draw();                         // 2. paint them
  requestAnimationFrame(loop);    // 3. call loop again next frame
}

// start once ALL pictures (Pochacco + both cacti) have loaded
let imagesLeft = allImages.length;
allImages.forEach(function (img) {
  function done() {
    imagesLeft -= 1;
    if (imagesLeft === 0) requestAnimationFrame(loop);
  }
  if (img.complete && img.naturalWidth > 0) {
    done();                       // already loaded (cached)
  } else {
    img.onload = done;
  }
});


// ================= FUTURE STEPS =================
// Extras: speed up over time, clouds, sound
