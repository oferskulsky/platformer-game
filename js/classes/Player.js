class Player extends AnimatedSprite {
  constructor({ position, color, keys }) {
    super({
      position, 
      imgSrc: `./img/${color}-player.png`,
      frames: 1,
      internalPosition: position
    })
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

    console.log(this.keyMap);
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
    return this.keys.up.pressed && this.velocity.y == 0
  }

  jump() {
    this.velocity.y = -this.velocity.jump;
  }

  shouldDuck() {
    return this.keys.down.pressed
  }

  duck() {
    this.image.src = this.image.src.replace('player.png', 'player-duck.png')
    this.position.y = (this.position.y + 25) > canvas.height - 50 ? canvas.height - 50 : this.position.y
    this.dimentions.height = this.height /2
  }

  unDuck() {
    this.image.src = this.image.src.replace('player-duck.png', 'player.png')
    this.position.y = Math.min((this.position.y) , canvas.height - this.image.height)
    this.dimentions.height = this.height
  }

  updatePosition() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }

  isFalling() {
    return this.position.y + this.dimentions.height + this.velocity.y < canvas.height
  }

  fall() {
    this.velocity.y += gravity;
  }

  unFall() {
    this.velocity.y = 0;
  }

  update() {
    this.draw();
    this.calculateVelocityX()
    
    if (this.shouldJump()) {
      this.jump();
    }

    if (this.shouldDuck()) {
      this.duck()
    } else {
      this.unDuck()
    }

    this.updatePosition()
    
    if (this.isFalling()) {
      this.fall()
    } else {
      this.unFall()
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
