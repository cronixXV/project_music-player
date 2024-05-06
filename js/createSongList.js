export function createSongList() {
  const list = document.createElement("ul");
  for (let i = 0; i < this.songsList.length; i++) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(this.songsList[i]));
    list.appendChild(li);
  }
  return list;
}
