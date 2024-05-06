import { createSongList } from "./createSongList.js";
import { setSong } from "./setSong.js";
import { onlyLoadSong } from "./onlyLoadSong.js";

export function loadSongsList() {
  try {
    fetch("songs.json")
      .then((response) => response.json())
      .then((songs) => {
        this.songsList = songs;
        const list = createSongList.bind(this)();
        this.containerMusicElement.appendChild(list);

        const links = document.querySelectorAll("li");
        for (let link of links) {
          link.addEventListener("click", setSong.bind(this));
        }

        onlyLoadSong.bind(this)(this.songsList[1]);
      });
  } catch (error) {
    console.error("Ошибка при загрузке списка песен:", error);
    // Выводим сообщение об ошибке пользователю
    alert(
      "Произошла ошибка при загрузке списка песен. Попробуйте обновить страницу."
    );
  }
}
