export function updateProgress() {
  if (this.playerElement.currentTime > 0) {
    this.musicProgressElement.value =
      (this.playerElement.currentTime / this.playerElement.duration) * 100;
  }
}
