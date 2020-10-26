import Player from './player/Player'
import Enemy from './npc/enemy'
import Background from './runtime/Background'
import GameInfo from './runtime/gameinfo'
import Controller from './runtime/Controller'
import Music from './runtime/MusicManager'
import DataManager from './DataManager'
import Singleton from './base/Singleton'

import {CONTROLLER_ENUM} from './enums/index'

let ctx = canvas.getContext('2d')

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH = 32
const BG_HEIGHT = 32
const BG_COLOR = '#140B28'

/**
 * 游戏主函数
 */
export default class Main extends Singleton {

	static GetInstance() {
		return super.GetInstance(Main)
	}

	constructor() {
		super()
		// 维护当前requestAnimationFrame的id
		// this.aniId    = 0
		this.databus = DataManager.GetInstance()
		this.bg = Background.GetInstance()
		this.player = Player.GetInstance()
		this.controller = Controller.GetInstance()
		this.music = Music.GetInstance()

		this.restart()
	}

	restart() {
		this.calcOffset()
		this.databus.reset()

		// this.hasEventBind = false

		// 清除上一局的动画
		// window.cancelAnimationFrame(this.aniId);

		// this.aniId = window.requestAnimationFrame(
		//   this.bindLoop,
		//   canvas
		// )


		const {
			x,
			y,
			direction
		} = this.databus.getLevel().playerInfo

		this.databus.setPlayerInfo(x, y, direction)

		this.bindLoop = this.loop.bind(this)
		this.loop()
	}

	// 实现游戏帧循环
	loop() {
		this.databus.frame++

		this.update()
		this.render()

		this.aniId = window.requestAnimationFrame(
			this.bindLoop,
			canvas
		)
	}

	/**
	 * canvas重绘函数
	 * 每一帧重新绘制所有的需要展示的元素
	 */
	render() {
		const {width, height} = canvas
		ctx.clearRect(0, 0, width, height)

		ctx.fillStyle = BG_COLOR
		ctx.fillRect(0, 0, width, height)

		this.bg.render(ctx)
		this.controller.render(ctx)

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.drawToCanvas(ctx)
		//   })

		// this.player.drawToCanvas(ctx, this.offset)
		this.player.render(ctx)

		// databus.animations.forEach((ani) => {
		if (this.player.isPlaying) {
			this.player.aniRender(ctx)
		}
		// })
	}

	// 游戏逻辑更新主函数
	update() {
		// if (databus.gameOver)
		//   return;

		// this.bg.update()

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.update()
		//   })

		// this.enemyGenerate()

		// this.collisionDetection()

		// if (databus.frame % 20 === 0) {
		//   this.player.shoot()
		//   this.music.playShoot()
		// }
	}

	nextLevel() {
		const nextIndex = this.databus.getLevelIndex() + 1
		this.databus.setLevelIndex(nextIndex)
	}

	getPlayerInfo() {
		return this.playerInfo
	}

	setPlayerInfo(playerInfo) {
		this.playerInfo = playerInfo
	}

	/***
	 * 判断角色是否能按预期进行移动
	 * @param type
	 */
	canPlayerMpve(type) {
		const {x, y, direction} = this.databus.getPlayerInfo()
		const tileInfo = this.bg.getTileMap()
		const {row, column} = this.databus.getMapCount()
		const {x, y} = playerInfo


		if (type === CONTROLLER_ENUM.TOP) {  //上
			//playerNext必须moveable，weaponNext必须turnable
			const playerNext = y - 1
			const weaponNext = y - 2
			if (playerNext < 0) {
				return false
			}

			return tileInfo[x][playerNext].moveable && tileInfo[x][weaponNext].turnable
		} else if (type === CONTROLLER_ENUM.BOTTOM) { //下
			const playerNext = y - 1
			const weaponNext = y - 2
			if (playerNext > column - 1) {
				return false
			}

			return tileInfo[x][playerNext].moveable && tileInfo[x][weaponNext].turnable
		} else if (type === CONTROLLER_ENUM.LEFT) {  //左
			const playerNext = x - 1
			const weaponNext = x - 2
			if (playerNext < 0) {
				return false
			}
			return tileInfo[playerNext][y].moveable && tileInfo[weaponNext][y].turnable
		} else if (type === CONTROLLER_ENUM.LEFT) {  //右
			const playerNext = x - 1
			const weaponNext = x - 2
			if (playerNext > row - 1) {
				return false
			}

			return tileInfo[playerNext][y].moveable && tileInfo[weaponNext][y].turnable
		} else if (type === CONTROLLER_ENUM.TURNLEFT) {//左转


		} else if (type === CONTROLLER_ENUM.TURNRIGHT) {//右转

		}

		//根据Tile判断能否移动
		return tileInfo[x][y].moveable
		// }

		return false
	}

	/***
	 * 计算设备宽高把canvas整体偏移到屏幕中央
	 */
	calcOffset() {
		const countObj = this.databus.getMapCount()

		const rowCount = countObj.row
		const columnCount = countObj.column
		const disX = (screenWidth - (BG_WIDTH * rowCount)) / 2
		const disY = (screenHeight - (BG_HEIGHT * columnCount)) / 2
		this.databus.setOffset(disX, disY)
	}
}
