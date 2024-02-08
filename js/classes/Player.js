class Player {
  constructor({ position, color, keys }) {
    this.dimentions = {
      height: 75,
      width: 75,
    };
    this.position = position;
    this.color = color;
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

  draw() {
    const canvas = document.querySelector("canvas");
    c.fillStyle = this.color;
    c.fillRect(
      this.position.x,
      this.position.y,
      this.dimentions.width,
      this.dimentions.height,
    );
  }

  update() {
    this.draw();

    this.velocity.x = this.keys.left.pressed
      ? -this.velocity.speed
      : this.keys.right.pressed
      ? this.velocity.speed
      : 0;
    if (this.keys.up.pressed && this.velocity.y == 0) {
      this.velocity.y = -this.velocity.jump;
    }

    if (this.keys.down.pressed ) {
      this.position.y = (this.position.y + 25) > canvas.height - 50 ? canvas.height - 50 : this.position.y
      this.dimentions.height = 50
    } else {
      this.position.y = Math.min((this.position.y) , canvas.height - 75)
      this.dimentions.height = 75
    }

    this.position.y += this.velocity.y;
    this.position.x = this.position.x + this.velocity.x;

    if (
      this.position.y + this.dimentions.height + this.velocity.y <
      canvas.height
    ) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
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
