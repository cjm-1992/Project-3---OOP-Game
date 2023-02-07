//Class built for collision boundaries -- PLACE IN CLASS.JS ON COMPLETION 
class Loadables {
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
}

class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        cntx.fillStyle = 'rgba, 255a, 0, 0, 0'
        cntx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}