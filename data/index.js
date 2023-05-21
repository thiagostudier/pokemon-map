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

const boundaries = []
const offset = {
  x: -952, 
  y: -575
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {

    if(symbol === 1025) {
      boundaries.push(new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } }))
    }
  })
})

/** Setar a imagem do mapa */
const image = new Image()
image.src = './images/map.png'

/** Setar a imagem do mapa, de foregrounds */
const foregroundImage = new Image()
foregroundImage.src = './images/foreground.png'

/** Setar o jogador */
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

/** Dimensões do sprite */
const widthSprite = 192
const heightSprite = 68

/** Declarar sprite do jogador */
const player = new Sprite({
  position: {
    x: canvas.width / 2 - widthSprite / 4 / 2,
    y: canvas.height / 2 - heightSprite / 2,
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

/** Imagem do background/mapa */
const background = new Sprite({ image: image, position: { x: offset.x, y: offset.y } })

/** Imagem do foreground/mapa */
const foreground = new Sprite({ image: foregroundImage, position: { x: offset.x, y: offset.y } })

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

/** Elementos móveis */
const movables = [background, ...boundaries, foreground]

/** Retangulos de colisão */
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

/** Função de animação */
function animate() {
  window.requestAnimationFrame(animate)

  /** Aplicar o fundo */
  background.draw()

  /** Desenhar o jogador */
  player.draw()

  /** Desenhar o foreground */
  foreground.draw()

  /** Colisões */
  boundaries.forEach(boundary => {
    boundary.draw()
  })

  let moving = true
  if(keys.w.pressed && lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if( rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      })) {
        moving = false
        break
      }
    }

    if(moving) movables.forEach(movable => movable.position.y += 3)

  } else if(keys.a.pressed && lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if( rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      })) {
        moving = false
        break
      }
    }

    if(moving) movables.forEach(movable => movable.position.x += 3)

  } else if(keys.s.pressed && lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if( rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }
      })) {
        moving = false
        break
      }
    }

    if(moving) movables.forEach(movable => movable.position.y -= 3)
    
  } else if(keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if( rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      })) {
        moving = false
        break
      }
    }

    if(moving) movables.forEach(movable => movable.position.x -= 3)
  }

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