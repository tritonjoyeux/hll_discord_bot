class RandomizeColor {
  colors = [
    "#f4bf30",
    "#8822db",
    "#d31bd8",
    "#247d9e",
    "#19f2d9",
    "#df8137",
    "#cc377f",
    "#8de4ae",
  ]

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }
}

export default new RandomizeColor();
