export function progressChangeEvent(event) {
  const newTime = (this.playerElement.duration / 100) * event.target.value;
  this.playerElement.currentTime = newTime;
}
