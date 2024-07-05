/*
@title: Quantum Shift
@tags: ['puzzle', 'quantum', 'dimension']
@addedOn: 2024-07-05
@author: Claude
*/

const player = "p";
const wall = "w";
const quantumWall = "q";
const exit = "e";
const shifter = "s";

const shiftSound = tune`
250: C5^250 + E5^250 + G5^250,
250: C6^250 + E6^250 + G6^250,
500`;

setLegend(
  [ player, bitmap`
................
......3333......
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3393333933...
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
......3333......
.....33..33.....
....33....33....
...33......33...`],
  [ wall, bitmap`
0000000000000000
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0000000000000000`],
  [ quantumWall, bitmap`
5555555555555555
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5222222222222225
5555555555555555`],
  [ exit, bitmap`
6666666666666666
6000000000000006
6027777777777206
6027000000007206
6027066666007206
6027066666007206
6027066666007206
6027066666007206
6027066666007206
6027066666007206
6027066666007206
6027000000007206
6027777777777206
6000000000000006
6666666666666666`],
  [ shifter, bitmap`
................
......7777......
.....778877.....
....77888877....
...7788888877...
..778888888877..
.77888888888877.
7788887778888877
7788887778888877
.77888888888877.
..778888888877..
...7788888877...
....77888877....
.....778877.....
......7777......
................`]
);

let level = 0;
const levels = [
  map`
pwwww
w...w
w.q.e
w...w
wwwww`,
  map`
pwwwww
w.q..w
w.wq.w
w..q.w
wsqq.e
wwwwww`,
  map`
pwwwwww
w.q..qw
w.wqw.w
wq.sw.w
w.wqw.w
w..q..e
wwwwwww`,
  map`
pwwwwwww
w.q.sq.w
w.wqww.w
wq.qsw.w
w.wqwwqw
ws.q.q.e
wwwwwwww`,
  map`
pwwwwwwww
w.q.s.q.w
w.wqwwq.w
wq.qswq.w
w.wqwwq.w
ws.q.sq.w
w.wqwwq.w
w..q..q.e
wwwwwwwww`
];

let currentLevel = levels[level];
setMap(currentLevel);
let inQuantumState = false;

addText("WASD to move, J to shift, K to reset", { y: 14, color: color`7` });

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

onInput("j", () => {
  inQuantumState = !inQuantumState;
  playTune(shiftSound);
  updateQuantumState();
});

onInput("k", () => {
  if (levels[level] !== undefined) {
    clearText();
    setMap(levels[level]);
    inQuantumState = false;
    updateQuantumState();
    addText("WASD to move, J to shift, K to reset", { y: 14, color: color`7` });
  }
});

function movePlayer(dx, dy) {
  const newX = getFirst(player).x + dx;
  const newY = getFirst(player).y + dy;
  const targetTile = getTile(newX, newY);

  if (!targetTile.includes(wall) && 
      !(targetTile.includes(quantumWall) && !inQuantumState)) {
    getFirst(player).x = newX;
    getFirst(player).y = newY;
    checkPlayerPosition();
  }
}

function checkPlayerPosition() {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y);
  
  if (playerTile.includes(shifter)) {
    inQuantumState = !inQuantumState;
    playTune(shiftSound);
    updateQuantumState();
  }
  
  if (playerTile.includes(exit)) {
    level++;
    if (levels[level] !== undefined) {
      clearText();
      setMap(levels[level]);
      inQuantumState = false;
      updateQuantumState();
      addText("Dimension shifted!", { y: 14, color: color`7` });
    } else {
      addText("You mastered quantum shifting!", { y: 7, color: color`7` });
    }
  }
}

function updateQuantumState() {
  const quantumWalls = tilesWith(quantumWall);
  quantumWalls.forEach(wall => {
    wall.opacity = inQuantumState ? 0.3 : 1;
  });
  
  addText(inQuantumState ? "Quantum State" : "Normal State", { y: 13, color: inQuantumState ? color`5` : color`7` });
}

updateQuantumState();
