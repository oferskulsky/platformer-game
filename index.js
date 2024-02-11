const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const elements = [];

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.2;

elements.push(
  new Player({
    position: {
      x: 0,
      y: 0,
    },
    color: "red",
    keys : {
      left: 'a',
      right: 'd',
      up: 'w',
      down: 's',
    }
  }),
  new Player({
    position: {
      x: 100,
      y: 0,
    },
    color: "blue",
    keys : {
      left: 'j',
      right: 'l',
      up: 'i',
      down: 'k',
    }
  }),
)

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  elements.forEach( e => e.update() );
}

animate();
window.addEventListener("keydown", keyChange(true));

window.addEventListener("keyup", keyChange(false));

function keyChange(isPressed) {
  return (event) => {
    elements.forEach( e => e.setState({ key: event.key, state: isPressed }) );
  };
}


