import { stopGameLoop, startGameLoop } from "./game.js";

const PauseButton = document.getElementById("pause-game");
const ResumeButton = document.getElementById("resume-game");

PauseButton.addEventListener("click", () => {
  stopGameLoop();
});

ResumeButton.addEventListener("click", () => {
  startGameLoop();
});
