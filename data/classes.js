/** Classe de limites */
class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0.0)'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

/** Sprite do jogador */
class Sprite {
  constructor({ image, position, velocity, frames = { max: 1 }}) {
    this.image = image
    this.position = position
    this.frames = frames

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
  }

  draw() {
     /** Jogador */
    context.drawImage(
      this.image, 
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x, 
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
  }
}