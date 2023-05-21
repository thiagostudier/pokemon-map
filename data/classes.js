/** Sprite do jogador */
class Sprite {
  constructor({
    image,
    position,
    velocity,
    frames = { max: 1 },
    moving = false,
    sprites,
  }) {
    this.image = image;
    this.position = position;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.moving = moving;

    this.sprites = sprites;
  }

  draw() {
    /** Jogador */
    context.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    /** Função para impedir o movimento do personagem */
    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

/** Classe de limites */
class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    context.fillStyle = "rgba(255, 0, 0, 0.0)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
