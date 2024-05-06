export function setSong(event) {
  try {
    this.sourceElement.src = `music/${event.target.textContent}`;
    document.getElementById(
      "music-current"
    ).textContent = `Сейчас играет ${event.target.textContent}`;

    this.playerElement.load();
    this.playerElement.play();
  } catch (error) {
    console.error("Ошибка при загрузке и воспроизведении музыки:", error);
    // Выводим сообщение об ошибке пользователю
    alert(
      `Произошла ошибка при загрузке и воспроизведении музыки "${event.target.textContent}". Попробуйте выбрать другую песню.`
    );
  }
}
