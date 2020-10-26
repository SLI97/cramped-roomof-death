import {
	CONTROLLER_ENUM
} from '../enums/index'
import Singleton from '../base/Singleton'

/***
 * 控制器，管理所有按钮的类
 */
export default class Controller  extends Singleton {

	static GetInstance() {
		return super.GetInstance(Controller)
	}

	constructor() {
		super()
		this.init()
	}

	init() {
		this.buttonList = []
		this.touchHandler = this.touchEventHandler.bind(this)
		this.initButton()
		this.unBind()
		this.onBind()
	}

	initButton() {
		const turnLeftButton = new Button(CONTROLLER_ENUM.TURNLEFT, 1)
		const leftButton = new Button(CONTROLLER_ENUM.LEFT, 2)
		const topButton = new Button(CONTROLLER_ENUM.TOP, 3)
		const bottomButton = new Button(CONTROLLER_ENUM.BOTTOM, 4)
		const turnRightButton = new Button(CONTROLLER_ENUM.TURNRIGHT, 5)
		const rightButton = new Button(CONTROLLER_ENUM.RIGHT, 6)
		this.buttonList = [
			turnLeftButton,
			leftButton,
			topButton,
			bottomButton,
			turnRightButton,
			rightButton,
		]
	}

	onBind() {
		canvas.addEventListener('touchstart', this.touchHandler)
	}

	unBind(){
		canvas.removeEventListener('touchstart', this.touchHandler)
	}



	touchEventHandler(e) {
		e.preventDefault()

		let x = e.touches[0].clientX
		let y = e.touches[0].clientY

		for (let i = 0; i < this.buttonList.length; i++) {
			const button = this.buttonList[i]
			if (x >= button.position.startX &&
				x <= button.position.endX &&
				y >= button.position.startY &&
				y <= button.position.endY) {
				button.onClick()
				break
			}
		}
	}


	render(ctx) {
		this.buttonList.forEach((button) => {
			button.render(ctx)
		})
	}
}
