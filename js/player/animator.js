import DataManager from '../DataManager'

let databus = new DataManager()

const IMG_IDLE_PREFIX = 'images/idle/idle'
const IMG_TURN_PREFIX = 'images/turn/turn'

const __ = {
  timer: Symbol('timer'),
}

const {
  offset
} = databus.getOffset()

const PLAYER_STATE = {
  IDLE: 'IDLE',
  ATTACK: 'ATTACK',
  TURNLEFT: 'TURNLEFT',
  TURNRIGHT: 'TURNRIGHT',
}

export default class Animatior {
  constructor(player) {
    this.player = player

    // 当前动画是否播放中
    this.isPlaying = false


    // 动画是否需要循环播放
    this.loop = false

    // 每一帧的时间间隔
    this.interval = 1000 / 6

    this.initFrames()
    this.playAnimation(0, true)
  }


  initFrames() {
    this.animation = {}

    for (const key in PLAYER_STATE) {
      if (PLAYER_STATE.hasOwnProperty(key)) {
        this.animation[key] = []
      }
    }

    const idleOrder = ['BOTTOM', 'RIGHT', 'TOP', 'LEFT']
    idleOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.IDLE][item] = []
      const offset = index * 4
      for (let i = 0; i < 4; i++) {
        const img = new Image()
        img.src = `${IMG_IDLE_PREFIX} (${i + 1 + offset}).png`
        this.animation[PLAYER_STATE.IDLE][item].push(img)
      }
    })

    const turnLeftOrder = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    turnLeftOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.TURNLEFT][item] = []
      const offset = index * 3
      for (let i = 0; i < 3; i++) {
        const img = new Image()
        img.src = `${IMG_TURN_PREFIX} (${i + 1 + offset}).png`
        this.animation[PLAYER_STATE.TURNLEFT][item].push(img)
      }
    })

    const turnRightOrder = ['BOTTOM', 'LEFT', 'TOP', 'RIGHT']
    turnRightOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.TURNRIGHT][item] = []
      const offset = index * 3 + 12
      for (let i = 0; i < 3; i++) {
        const img = new Image()
        img.src = `${IMG_TURN_PREFIX} (${i + 1 + offset}).png`
        this.animation[PLAYER_STATE.TURNRIGHT][item].push(img)
      }
    })
  }

  // 将播放中的帧绘制到canvas上
  render(ctx) {
    const {
      x,
      y,
      width,
      height,
      state,
      direction
    } = this.player

    const image = this.animation[state][direction][this.index]
    ctx.drawImage(
      image,
      x + offset.width - 32 - 15,
      y + offset.height - 32 - 18,
      width,
      height
    )
  }

  // 播放预定的帧动画
  playAnimation(index = 0, loop = false) {

    // 动画播放的时候精灵图不再展示，播放帧动画的具体帧
    // this.visible = false
    const {
      state,
      direction
    } = this.player
    const currentList = this.animation[state][direction]

    this.isPlaying = true
    this.loop = loop

    this.index = index

    if (this.interval > 0 && currentList.length) {
      this[__.timer] = setInterval(
        this.frameLoop.bind(this),
        this.interval
      )
    }
  }

  // 帧遍历
  frameLoop() {
    const {
      state,
      direction
    } = this.player
    const currentList = this.animation[state][direction]

    this.index++
    // console.log(state, direction)
    if (this.index > currentList.length - 1) {
      if (state === PLAYER_STATE.TURNLEFT || state === PLAYER_STATE.TURNRIGHT) {
        this.resetIndex()
        this.player.state = PLAYER_STATE.IDLE
      }
      if (this.loop) {
        this.resetIndex()
      } else {
        this.index--
        this.stop()
      }
    }
  }

  resetIndex() {
    this.index = 0
  }

  // 停止帧动画播放
  stop() {
    this.isPlaying = false

    if (this[__.timer])
      clearInterval(this[__.timer])
  }
}
