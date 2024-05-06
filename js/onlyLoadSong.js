export function onlyLoadSong(song) {
  this.sourceElement.src = `music/${song}`;
  document.querySelector(
    "#music-current"
  ).textContent = `Сейчас играет ${song}`;
  this.playerElement.load();
  // this.playerElement.play();
}
