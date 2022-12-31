import { stopGameLoop, startGameLoop } from "./game.js";

const PauseButton = document.getElementById("pause-game");
const ResumeButton = document.getElementById("resume-game");

let gamePaused = true;

const hideButtons = () => {
  // if the game is paused, only the resume button should be visible
  // if the game is not paused, only the pause button should be visible
  if (gamePaused) {
    PauseButton.style.display = "none";
    ResumeButton.style.display = "block";
  } else {
    PauseButton.style.display = "block";
    ResumeButton.style.display = "none";
  }
};
hideButtons();

PauseButton.addEventListener("click", () => {
  stopGameLoop();
  gamePaused = true;
  hideButtons();
});

ResumeButton.addEventListener("click", () => {
  startGameLoop();
  gamePaused = false;
  hideButtons();
});
