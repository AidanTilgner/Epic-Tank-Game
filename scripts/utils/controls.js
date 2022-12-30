export const setUpControls = () => {
  // * Define keys to check for
  const keys = {
    LEFT: {
      pressed: false,
    },
    RIGHT: {
      pressed: false,
    },
    UP: {
      pressed: false,
    },
    DOWN: {
      pressed: false,
    },
    SPACE: {
      pressed: false,
    },
  };

  // * Every time a key is pressed, set the appropriate key to true
  // * Every time a key is released, set the appropriate key to false

  // * Add event listeners for keydown and keyup
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        keys.LEFT.pressed = true;
        break;
      case "d":
      case "ArrowRight":
        keys.RIGHT.pressed = true;
        break;
      case "w":
      case "ArrowUp":
        keys.UP.pressed = true;
        break;
      case "s":
      case "ArrowDown":
        keys.DOWN.pressed = true;
        break;
      case " ":
        keys.SPACE.pressed = true;
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        keys.LEFT.pressed = false;
        break;
      case "d":
      case "ArrowRight":
        keys.RIGHT.pressed = false;
        break;
      case "w":
      case "ArrowUp":
        keys.UP.pressed = false;
        break;
      case "s":
      case "ArrowDown":
        keys.DOWN.pressed = false;
        break;
      case " ":
        keys.SPACE.pressed = false;
        break;
    }
  });

  return keys;
};
