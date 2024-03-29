class AnimatedSprite {
    constructor({ position, imgSrc, frames, internalPosition}) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
        }
        this.image.src = imgSrc
        this.frames = frames
    }

    draw() {
        if (!this.image) {
            return;
        }
        c.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height)
    }

    update() {
        this.draw()
    }

}