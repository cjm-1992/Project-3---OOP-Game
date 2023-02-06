const canvas = document.querySelector('canvas')
const cntx = canvas.getContext('2d')

//canvas size
canvas.width = 1024
canvas.height = 576

const baseRoomColMap = []
for (let i = 0; i < baseRoomCol.length; i += 30) {
    baseRoomColMap.push(baseRoomCol.slice(i, 30 + i))
}

class Collision {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        cntx.fillStyle = 'red'
        cntx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const mapCols0 = [] //ARRAY FOR MULTIPLE COLS
const imgOffset = {
    x: -448,
    y: -850
}

//BASE ROOM BOUNDARIES
baseRoomColMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 145)
            mapCols0.push(
                new Collision({
                    position: {
                        x: j * Collision.width + imgOffset.x, //CAN ADD STATIC VALUES TO THIS IN COLLISIONS CLASS//
                        y: i * Collision.height + imgOffset.y
                    }
                })
            )
    })
})

// imgs
const bkgrnd = new Image()
bkgrnd.src = './img/roomMaps/baseRoom.PNG'

const charImg1 = new Image()
charImg1.src = './img/charSprite/playerDown.png'

//class creation - PLACE INTO 'CLASS.JS'
class Sprite {
    constructor({ position, image, frames = { max: 1 } }) {
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
}

const mainChar = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: charImg1,
    frames: {
        max: 4
    }
})

//background
const background = new Sprite({
    position: {
        x: imgOffset.x,
        y: imgOffset.y
    },
    image: bkgrnd
})

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
const movements = [
    background,
    ...mapCols0
]

function pcollision({ pcol: charCol, col: worldCol }) {
    return (
        charCol.position.x + charCol.width >= worldCol.position.x &&
        charCol.position.x <= worldCol.position.x + worldCol.width &&
        charCol.position.y <= worldCol.position.y + worldCol.height &&
        charCol.position.y + charCol.height >= worldCol.position.y
    )
}

//animate sprite movement
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    mapCols0.forEach((mapCol0) => {
        mapCol0.draw()  
    })

    mainChar.draw()

    //movement 
    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                pcollision({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x,
                            y: mapCol0.position.y + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
    

        if (moving)
            movements.forEach ((movement) => {
                movement.position.y += 3
            })
    }   else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                pcollision({
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
            movements.forEach ((movement) => {
                movement.position.x += 3
            })

    }  else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                pcollision({
                    charCol: mainChar,
                    worldCol: {
                        ...mapCol0,
                        position: {
                            x: mapCol0.position.x,
                            y: mapCol0.position.y - 3
                        }
                    }
                })
            )   {
                moving = false
                break
            }
        }
    
        if (moving)
            movements.forEach((movement) => { 
                movement.position.y -= 3
            })
    }   else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < mapCols0.length; i++) {
            const mapCol0 = mapCols0[i]
            if (
                pcollision({
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
        movements.forEach ((movement) => {
            movement.position.x -= 3
        })
    }
}
animate()

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
