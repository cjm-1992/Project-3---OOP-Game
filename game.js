const canvas = document.querySelector('canvas')
const cntx = canvas.getContext('2d')

//canvas size
canvas.width = 1024
canvas.height = 576

const room0ColMap = []
for (let i = 0; i < baseRoomCol.length; i += 30) {
    room0ColMap.push(baseRoomCol.slice(i, 30 + i))
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
room0ColMap.forEach((row, i) => {
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

function collide ({ charCol, worldCol }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
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

   const xOffset = keys.a.pressed && lastKey === 'a' 
   ? 3 : keys.d.pressed && lastKey === 'd' ? -3 : 0
   const yOffset = keys.w.pressed && lastKey === 'w' 
   ? 3 : keys.s.pressed && lastKey === 's' ? -3 : 0

   const moving = mapCols0.some(worldCol => collide({
    charCol: mainChar,
    worldCol: {
        ...mapCols0,
        position: {
            x: mapCol0.position.x + xOffset,
            y: mapCol0.position.y + yOffset
        }
    }
   }))

   if (moving)
   movements.forEach ((movement) =>{
    movement.position.y += 3
   })
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
