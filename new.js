const canvas = document.querySelector('canvas')
const cntx = canvas.getContext('2d')

//canvas size
canvas.width = 1024
canvas.height = 576

const room0ColMap = []
for (let i = 0; i < room0Col.length; i += 30) {
    room0ColMap.push(room0Col.slice(i, 30 + i))
}

/*Class built for collision boundaries -- PLACE IN CLASS.JS ON COMPLETION 
class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        cntx.fillStyle = 'rgba, 255, 0, 0, 0'
        cntx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}*/

const mapCols0 = []
const imgOffset = {
    x: -448,
    y: -850
}

//Room 0 Collision Boundaries (Copy for following rooms)
room0ColMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 145)
            mapCols0.push(
                new Boundary ({
                    position: {
                        x: j * Boundary.width + imgOffset.x,
                        y: i * Boundary.height + imgOffset.y
                    }
                })
            )

    })
})

//Room 0 image
const room0bkgrnd = new Image()
room0bkgrnd.src = './img/roomMaps/room0.png'

//Sprite images (COME BACK TO THIS TO ANIMATE MOVEMENT)
const playerSprite = new Image()
playerSprite.src = './img/playerSprite/playerDown.png'

/*Class built for Backgrounds + Playable character
class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 }
    }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.load = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        cntx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}*/

//Playable Character loaded
const mainChar = new Loadables({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerSprite,
    frames: {
        max: 4
    }
})

//Background image loaded
const background = new Loadables({
    position: {
        x: imgOffset.x,
        y: imgOffset.y
    },
    image: room0bkgrnd
})

//Assigning key push interactions
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

//Moveable items 
const movements = [
    background,
    ...mapCols0,
]

//Collision logic -- incomplete
function collide({ charCol, worldCol }) {
    return (
        charCol.position.x + charCol.width >= worldCol.position.x &&
        charCol.position.x <= worldCol.position.x + worldCol.width &&
        charCol.position.y <= worldCol.position.y + worldCol.height &&
        charCol.position.y + charCol.height >= worldCol.position.y
    )
}

//Animation loop
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    mapCols0.forEach((mapCol0) => {
        mapCol0.draw()
    })
    mainChar.draw()

    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                collide({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x,
                            y: mapCol0.position.x + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movements.forEach((movement) => {
                movement.position.y += 3
            })
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                collide({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x + 3,
                            y: mapCol0.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movements.forEach((movement) => {
                movement.position.x += 3
            })
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                collide({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x - 3,
                            y: mapCol0.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movements.forEach((movement) => {
                movement.position.y -= 3
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                collide({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x,
                            y: mapCol0.position.y - 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movements.forEach((movement) => {
                movement.position.x -= 3
            })
    }
} animate()

//Key input (last key used to allow better movement)
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})