export function startMusic() {
  if (this.playerElement.readyState) {
    this.playerElement.play();
  }
}
