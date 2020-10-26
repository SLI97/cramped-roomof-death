import Sprite from '../base/Sprite'
import EventManager from '../EventManager'
import {EVENT_ENUM} from '../enums'

const IMG_PREFIX = 'images/ctrl/ctrl'
const CTRL_WIDTH = 48
const CTRL_HEIGHT = 48

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
/***
 * 按钮类
 */
export class Button extends Sprite {
	constructor(type, index) {
		super(`${IMG_PREFIX} (${index}).png`)
		this.type = type

		const xAxis = Math.floor((index - 1) / 2)
		const yAxis = (index - 1) % 2
		this.position = {
			startX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH,
			startY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT,
			endX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH + CTRL_WIDTH,
			endY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT + CTRL_HEIGHT
		}
	}

	render(ctx) {
		ctx.drawImage(
			this.img,
			this.position.startX,
			this.position.startY,
			CTRL_WIDTH,
			CTRL_HEIGHT
		)
	}

	onClick() {
		EventManager.GetInstance().emit(EVENT_ENUM.PLAYER_CTRL, this.type)
	}
}
