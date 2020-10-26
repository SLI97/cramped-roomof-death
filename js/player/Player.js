import Animatior from './animator'
import Main from '../Main'
import DataManager from '../DataManager'
import EventManager from '../EventManager'
import {EVENT_ENUM} from '../enums/index'
import Sprite from '../base/Sprite'
import {
	DIRECTION_ENUM,
	CONTROLLER_ENUM,
	PLAYER_STATE
} from '../enums/index'

const PLAYER_IMG_SRC = 'images/idle/idle (1).png'

const PLAYER_WIDTH = 128
const PLAYER_HEIGHT = 128
const PLAYER_SPEED = 32

const DIRECTION_ORDER = [
	DIRECTION_ENUM.RIGHT,
	DIRECTION_ENUM.BOTTOM,
	DIRECTION_ENUM.LEFT,
	DIRECTION_ENUM.TOP,
]

// const __ = {
//   speed: Symbol('speed')
// }

export default class Player extends Sprite {

	static _instance

	static GetInstance(Player) {
		if (this._instance == null) {
			this._instance = new Player()
		}
		return this._instance
	}

	constructor() {
		super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
		this.init()
		this.animator = new Animatior(this)
		EventManager.GetInstance().on(EVENT_ENUM,this.move)
	}

	init(x, y, direction) {
		this.speed = PLAYER_SPEED
		this.direction = DIRECTION_ENUM.RIGHT
		this.state = PLAYER_STATE.IDLE
	}

	/***
	 * 玩家渲染
	 * @param ctx
	 */
	render(ctx) {
		this.animator.render(ctx)
	}


	/***
	 * 根据type玩家移动
	 * @param type 控制类型CONTROLLER_ENUM之一
	 */
	move(type) {
		if(!Main.GetInstance().canPlayerMpve()){

		}

		this.animator.resetIndex()
		if (type === CONTROLLER_ENUM.TURNLEFT) {
			this.state = PLAYER_STATE.TURNLEFT
			const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
			const next = (index - 1 < 0) ? DIRECTION_ORDER.length - 1 : index - 1
			this.direction = DIRECTION_ORDER[next]
		} else if (type === CONTROLLER_ENUM.LEFT) {
			this.x -= this.speed
		} else if (type === CONTROLLER_ENUM.TOP) {
			this.y -= this.speed
		} else if (type === CONTROLLER_ENUM.BOTTOM) {
			this.y += this.speed
		} else if (type === CONTROLLER_ENUM.TURNRIGHT) {
			this.state = PLAYER_STATE.TURNRIGHT
			const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
			const next = index + 1 > (DIRECTION_ORDER.length - 1) ? 0 : index + 1
			this.direction = DIRECTION_ORDER[next]
		} else if (type === CONTROLLER_ENUM.RIGHT) {
			this.x += this.speed
		}
	}

}
