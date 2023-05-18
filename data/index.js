console.log(collisions)

/** Bloco do canvas */
const canvas = document.querySelector('canvas')

/** Contexto do canvas */
const context = canvas.getContext('2d')

/** Setar as dimensões do mapa */
canvas.width = 1024
canvas.height = 576
context.fillRect(0, 0, canvas.width, canvas.height)

/** Setar a imagem do mapa */
const image = new Image()
image.src = './images/MyPokemonMap.png'

/** Setar o jogador */
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

class Sprint {
  constructor({ image, position, velocity }) {
    this.image = image
    this.position = position
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprint({ image: image, position: { x: -952, y: -550} })

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

/** Função de animação */
function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  
  /** Jogador */
  context.drawImage(
    playerImage, 
    0,
    0,
    playerImage.width / 4,
    playerImage.height, 
    canvas.width / 2 - playerImage.width / 4,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  )

  if(keys.w.pressed && lastKey === 'w') background.position.y += 3
  else if(keys.a.pressed && lastKey === 'a') background.position.x += 3
  else if(keys.s.pressed && lastKey === 's') background.position.y -= 3
  else if(keys.d.pressed && lastKey === 'd') background.position.x -= 3

}

animate()

/** Eventos de click */
let lastKey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    /** Caso clique no botão "w" ou seta para cima */
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break;

    /** Caso clique no botão "a" ou seta para esquerda */
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break;

    /** Caso clique no botão "s" ou seta para baixo */
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break;

    /** Caso clique no botão "d" ou seta para direita */
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break;
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    /** Caso clique no botão "w" ou seta para cima */
    case 'w':
      keys.w.pressed = false
      break;

    /** Caso clique no botão "a" ou seta para esquerda */
    case 'a':
      keys.a.pressed = false
      break;

    /** Caso clique no botão "s" ou seta para baixo */
    case 's':
      keys.s.pressed = false
      break;

    /** Caso clique no botão "d" ou seta para direita */
    case 'd':
      keys.d.pressed = false
      break;
  }
})