// ================= SETUP =================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;   // keeps pixel art crisp

const player = new Image();
player.src = "images/player.png";
player.onerror = function () {
  console.log("IMAGE FAILED: check images/player.png");
};


// ================= SETTINGS =================
// Player
const GROUND_Y       = 170;   // y position of the ground line
const GRAVITY        = 0.4;   // how fast he falls back down
const JUMP_POWER     = 9;    // how hard he launches upward
const PLAYER_X       = 50;    // how far from the left edge he stands
const HITBOX_PADDING = 8;     // shrinks his hitbox so near-misses feel fair

// Cacti
const GAME_SPEED      = 3;              // how fast cacti move left (pixels per frame)
const CACTUS_WIDTH    = 20;
const CACTUS_HEIGHTS  = [30, 40];   // short, medium
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

  // Cactus hitbox
  const cactusLeft   = c.x;
  const cactusRight  = c.x + c.width;
  const cactusTop    = GROUND_Y - c.height;
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
  gameOver = false;
  cacti = [];
  spawnTimer = 0;
  nextSpawn = randomGap();
  score = 0;
}

// Stops the game and saves a new high score if there is one
function endGame() {
  gameOver = true;

  const finalScore = Math.floor(score);
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("trexHighScore", highScore);   // survives page refreshes
  }
}


// ================= STATE =================
let y = 0;                      // height above the ground (0 = standing on it)
let velocity = 0;               // up/down speed (0 = standing still)
let gameOver = false;

let cacti = [];                 // all cacti currently on screen
let spawnTimer = 0;             // frames since the last cactus appeared
let nextSpawn = randomGap();    // frames to wait before the next one

let score = 0;
let highScore = Number(localStorage.getItem("trexHighScore")) || 0;   // 0 if nothing saved yet


// ================= INPUT =================
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();   // stops the page from scrolling

    if (gameOver) {
      resetGame();                 // Space restarts after a crash
    } else if (y === 0) {
      velocity = JUMP_POWER;       // only jump when on the ground (no double jumps)
    }
  }
});


// ================= UPDATE (the physics) =================
function update() {
  if (gameOver) return;   // freeze everything after a crash

  // --- player physics ---
  y += velocity;          // move by current speed
  velocity -= GRAVITY;    // gravity slows his upward speed

  if (y < 0) {            // landed: back on the ground, stop moving
    y = 0;
    velocity = 0;
  }

  // --- cacti ---
  // 1. move every cactus left
  for (const c of cacti) {
    c.x -= GAME_SPEED;
  }

  // 2. count frames, and add a new cactus at the right edge when it's time
  spawnTimer += 1;
  if (spawnTimer >= nextSpawn) {
    // pick a random height from the list
    const height = CACTUS_HEIGHTS[Math.floor(Math.random() * CACTUS_HEIGHTS.length)];
    cacti.push({ x: canvas.width, width: CACTUS_WIDTH, height: height });
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
  ctx.clearRect(0, 0, 600, 200);   // wipe the previous frame

  ctx.fillStyle = "#535353";
  ctx.fillRect(0, GROUND_Y, 600, 2);   // ground line

  // cacti: rectangles standing on the ground
  for (const c of cacti) {
    ctx.fillRect(c.x, GROUND_Y - c.height, c.width, c.height);
  }

  // Pochacco: feet on the ground, lifted up by y when jumping
  ctx.drawImage(player, PLAYER_X, GROUND_Y - player.height - y);

  // score, top right
  ctx.fillStyle = "#535353";
  ctx.font = "16px monospace";
  ctx.fillText("HI " + highScore + "   " + Math.floor(score), 430, 25);

  // game over message
  if (gameOver) {
    ctx.font = "20px monospace";
    ctx.fillText("GAME OVER", 240, 95);
    ctx.font = "14px monospace";
    ctx.fillText("Press Space to restart", 208, 120);
  }
}


// ================= GAME LOOP =================
function loop() {
  update();                       // 1. change the numbers
  draw();                         // 2. paint them
  requestAnimationFrame(loop);    // 3. call loop again next frame
}

player.onload = loop;             // start once the image has loaded


// ================= FUTURE STEPS =================
// Extras: speed up over time, clouds, sound, better cactus art