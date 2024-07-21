/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Timing
@author: Darsh Gupta 
@tags: []
@addedOn: 2024-06-24
*/

const player = "p"
const boss = "b"
const proj = "k"

setLegend(
  [ player, bitmap`
................
................
................
................
.......000......
.......030......
.......000......
........0.......
......00000.....
........0.......
........0.......
.......0.0......
................
................
................
................` ],
  [ boss, bitmap`
................
...4.......4....
....44...44.....
....44.4.44.....
......444.......
.....44944......
......444.......
....44.4.44.....
....44...44.....
...4.......4....
................
................
................
................
................
................`],
  [ proj, bitmap`
................
................
................
................
................
................
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................
................
................
................` ],
)

setSolids([])

let level = 0
const levels = [
  map`
.............p.
...............
...............
...............
.......b.......
...............
...............
...............
...............
...............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let projs = []
let lastproj = Date.now()
let bossprojs = []

class Projectile {
  constructor(id, x, y, dir, spd) {
    this.id = id
    this.x = x
    this.y = y
    this.dir = dir
    this.spd = spd
  }

  create() {
    addSprite(this.x, this.y, proj);
  }

  update() {
    clearTile(this.x, this.y)
    this.x += this.dir*this.spd
    if (this.x < width() && this.x >= 0) {
      this.create()
    }
    else {
      projs.splice(projs.findIndex(obj => obj.id === this.id))
    }
  }
}

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  if (projs.length >= 5 || (Date.now() - lastproj < 700)) {return}
  projs.push(new Projectile(projs.length+1, getFirst(player).x-1, getFirst(player).y, -1, 1))
  lastproj = Date.now()
})
onInput("l", () => {
  if (projs.length >= 5 || (Date.now() - lastproj < 700)) {return}
  projs.push(new Projectile(projs.length+1, getFirst(player).x+1, getFirst(player).y, 1, 1))
  lastproj = Date.now()
})

const playerproj = setInterval(() => {
  for (let i = 0; i < projs.length; i++) {
    projs[i].update();
  }
}, 200)
const bossprojupdate = setInterval(() => {
  for (let i = 0; i < bossprojs.length; i++) {
    bossprojs[i].update();
  }
}, 200)

const bossproj = setInterval(() => {
  for (let i=0; i<getAll(boss).length; i++) {
    bossprojs.push(new Projectile(bossprojs.length+1, getAll(boss)[i].x+1, getAll(boss)[i].y, 1, 1))
    bossprojs.push(new Projectile(bossprojs.length+1, getAll(boss)[i].x-1, getAll(boss)[i].y, -1, 1))
    bossprojs.push(new Projectile(bossprojs.length+1, getAll(boss)[i].x, getAll(boss)[i].y+1, 1, 1))
    bossprojs.push(new Projectile(bossprojs.length+1, getAll(boss)[i].x, getAll(boss)[i].y-1, -1, 1))
    playTune(shootsfx)
  }
}, 1500)

function gameStop() {
  clearInterval(gameupdate)
  clearInterval(bossproj)
  clearInterval(playerproj)
  projs = []
  lastproj = Date.now()
  bossprojs = []
}

const gameupdate = setInterval(() => {
  if ((getTile(getFirst(boss).x, getFirst(boss).y)).length > 1) {
    // win
      setMap(levels[level+1])
      level++
    
  }
  if ((getTile(getFirst(player).x, getFirst(player).y)).length > 1) {
    addText("You Lose :(", {x: 4, y: 4, color: color`7`})
    playTune(losesfx)
    gameStop()
  }
}, 1)