/** Bloco do canvas */
const canvas = document.querySelector('canvas')

/** Contexto do canvas */
const context = canvas.getContext('2d')

/** Setar as dimensões do mapa */
canvas.width = 1024
canvas.height = 576

/** Tratar as colisões */
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

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
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

/** Offset */
const offset = {
  x: -952, 
  y: -550
}

const boundaries = []
collisionsMap.forEach((row, x) => {
  row.forEach((symbol, y) => {
    if(symbol === 1025)
      boundaries.push(new Boundary({ position: { x: x * Boundary.width + offset.x, y: y * Boundary.height + offset.y } }))
  })
})

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

const background = new Sprint({ image: image, position: { x: offset.x, y: offset.y } })

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

  /** Aplicar o fundo */
  background.draw()

  /** Colisões */
  boundaries.forEach(boundary => {
    console.log(boundary)
    boundary.draw()
  })
  
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