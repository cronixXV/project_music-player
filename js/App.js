class App {
  songsList = [];

  constructor(
    playerElement,
    containerMusicElement,
    sourceElement,
    volumeSliderElement,
    musicProgressElement,
    musicActionsElement
  ) {
    this.playerElement = playerElement;
    this.containerMusicElement = containerMusicElement;
    this.sourceElement = sourceElement;
    this.volumeSliderElement = volumeSliderElement;
    this.musicProgressElement = musicProgressElement;
    this.musicActionsElement = musicActionsElement;
  }

  init() {
    this.loadSongsList();

    this.volumeSliderElement.addEventListener("input", (event) => {
      this.playerElement.volume = event.target.value / 100;
    });

    this.playerElement.addEventListener("timeupdate", () => {
      this.updateProgress();
    });

    this.musicActionsElement
      .querySelector("#music-actions-start")
      .addEventListener("click", () => {
        this.startMusic();
      });

    this.musicActionsElement
      .querySelector("#music-actions-pause")
      .addEventListener("click", () => {
        this.pauseMusic();
      });

    this.musicProgressElement.addEventListener("click", (event) => {
      const clickPosition = event.offsetX;
      const progressWidth = this.musicProgressElement.clientWidth;
      const newValue = (clickPosition / progressWidth) * 100;

      this.musicProgressElement.value = newValue;
      this.progressChangeEvent({ target: this.musicProgressElement });
    });
  }

  loadSongsList() {
    try {
      fetch("songs.json")
        .then((response) => response.json())
        .then((songs) => {
          this.songsList = songs;
          const list = this.createSongList();
          this.containerMusicElement.appendChild(list);

          const links = document.querySelectorAll("li");
          for (let link of links) {
            link.addEventListener("click", this.setSong.bind(this));
          }

          this.onlyLoadSong(this.songsList[1]);
        });
    } catch (error) {
      console.error("Ошибка при загрузке списка песен:", error);
      // Выводим сообщение об ошибке пользователю
      alert(
        "Произошла ошибка при загрузке списка песен. Попробуйте обновить страницу."
      );
    }
  }

  createSongList() {
    const list = document.createElement("ul");
    for (let i = 0; i < this.songsList.length; i++) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(this.songsList[i]));
      list.appendChild(li);
    }
    return list;
  }

  setSong(event) {
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

  updateProgress() {
    if (this.playerElement.currentTime > 0) {
      this.musicProgressElement.value =
        (this.playerElement.currentTime / this.playerElement.duration) * 100;
    }
  }

  startMusic() {
    if (this.playerElement.readyState) {
      this.playerElement.play();
    }
  }

  pauseMusic() {
    this.playerElement.pause();
  }

  onlyLoadSong(song) {
    this.sourceElement.src = `music/${song}`;
    document.querySelector(
      "#music-current"
    ).textContent = `Сейчас играет ${song}`;
    this.playerElement.load();
    // this.playerElement.play();
  }

  progressChangeEvent(event) {
    const newTime = (this.playerElement.duration / 100) * event.target.value;
    this.playerElement.currentTime = newTime;
  }
}

//на классах
