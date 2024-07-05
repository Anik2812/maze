
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p"
    const wall = "o"
    const door = "l"
    const box = "i"


setSolids([ player, wall, box ]);

setLegend(
	[ player, bitmap`
................
................
.....7777777....
....7.......7...
....7.3...3.7...
....7.......7...
....7.3...3.7...
....7..333..7...
....7.......7...
.....7777777....
........7.......
.....4..7..4....
......44744.....
........7.......
.......4.4......
......4...4.....` ],
    [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ door, bitmap`
................
................
.....0000000....
.....0022200....
.....0022200....
.....0000000....
.....0000000....
.....0000220....
.....0000220....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
................` ],
  [ box, bitmap`
................
................
..9LLLLLLLLL9...
..L2LLLLLLL.L...
..LL2LLLLL.LL...
..LLL2LLL.LLL...
..LLLL2L.LLLL...
..LLLLL2LLLLL...
..LLLL.L2LLLL...
..LLL.LLL2LLL...
..LL.LLLLL2LL...
..L.LLLLLLL2L...
..9LLLLLLLLL9...
................
................
................`
    
])

let level = 0;
const level = 
setMap(levels[level])

setPushables({
	[ player ]: [box]
})

onInput("w", () => {
	getFirst(player).y -= 1
})
onInput("a", () => {
	getFirst(player).x -= 1
})
onInput("s", () => {
	getFirst(player).y += 1
})
onInput("d", () => {
	getFirst(player).x += 1
})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    
  }
  
});

afterInput(() => {
    const doorsCovered = tilesWith(player, door); // tiles that both contain the player and door

    // if at least one door is overlapping with a player, proceed to the next level
    if (doorsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 8, color: color`3` });
        }
    }
});
