class Player extends AnimatedSprite {
  constructor({ position, color, keys }) {
    super({
      position,
      imgSrc: `./img/${color}-player.png`,
      frames: 1,
      internalPosition: position,
    });
    this.dimentions = {
      height: this.height,
      width: this.width,
    };
    this.velocity = {
      speed: 4,
      jump: 6,
      x: 0,
      y: 1,
    };
    this.keyMap = new Map();

    for (const [key, value] of Object.entries(keys)) {
      this.keyMap.set(value, key);
    }
  }

  keys = {
    left: {
      pressed: false,
    },
    right: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
  };

  calculateVelocityX() {
    this.velocity.x = this.keys.left.pressed
      ? -this.velocity.speed
      : this.keys.right.pressed
      ? this.velocity.speed
      : 0;
  }

  shouldJump() {
    return this.keys.up.pressed && this.velocity.y == 0;
  }

  jump() {
    this.velocity.y = -this.velocity.jump;
  }

  shouldDuck() {
    return this.keys.down.pressed;
  }

  duck(isDucking) {
    let oldSize = this.image.height;
    this.image.src = isDucking
      ? this.image.src.replace("player.png", "player-duck.png")
      : this.image.src.replace("player-duck.png", "player.png");
    if (this.image.height !== oldSize) {
      this.position.y = Math.min(
        this.position.y + this.image.height - oldSize,
        canvas.height - this.image.height
      );
    }
    this.dimentions.height = this.image.height;
  }

  findBlock() {
    if (this.velocity.x !== 0) {
      elements.forEach((other) => {
        if (other !== this) {
          const isLeftOfThis = other.position.x + other.width < this.position.x + this.velocity.x ;
          const isRightOfThis = other.position.x > this.position.x + this.width + this.velocity.x ;
          const isAboveThis = other.position.y + other.height < this.position.y + this.velocity.y ;
          const isUnderThis = other.position.y > this.position.y + this.height + this.velocity.y ;
          if (!isAboveThis && !isUnderThis && !isLeftOfThis && !isRightOfThis ) {
            this.velocity.x = 0
          }
        }
      });
    }
  }

  updatePosition() {
    this.findBlock();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }

  isFalling() {
    return (
      this.position.y + this.dimentions.height + this.velocity.y < canvas.height
    );
  }

  fall() {
    this.velocity.y += gravity;
  }

  unFall() {
    this.velocity.y = 0;
  }

  update() {
    this.draw();
    this.updatePosition();
    this.calculateVelocityX();

    if (this.shouldJump()) {
      this.jump();
    }

    this.duck(this.shouldDuck());

    if (this.isFalling()) {
      this.fall();
    } else {
      this.unFall();
    }
  }

  setState({ key, state }) {
    let target = this.keyMap.get(key);
    if (this.keys[target]) {
      let theKey = this.keys[target];
      theKey.pressed = state;
    }
  }
}
