import DataManager from '../DataManager'
import Tile from './Tile'
import Singleton from '../base/Singleton'


const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_PREFIX = 'images/bg/bg'

export default class Background extends Singleton {

	static GetInstance() {
		return super.GetInstance(Background)
	}

	constructor() {
		super()
		this.initTile()
	}

	initTile() {
		this.tileMap = []
		const DM = DataManager.GetInstance()
		const mapInfo = DM.getMapInfo()
		const offset = DM.getOffset()

		for (let i = 0; i < mapInfo.length; i++) {
			const colum = mapInfo[i]
			this.tileMap[i] = []
			for (let j = 0; j < colum.length; j++) {
				this.tileMap[i][j] = null

				const item = colum[j]
				if (item.src === null) {
					continue
				}
				let number = parseInt(item.src)
				if (number === 1) {
					number += rnd(0, 4)
				} else if (number === 5) {
					number += rnd(0, 4)
				} else if (number === 9) {
					number += rnd(0, 4)
				}

				const imgSrc = `${IMG_PREFIX} (${number}).png`
				const x = i * BG_WIDTH + offset.width
				const y = j * BG_HEIGHT + offset.height
				const type = item.type

				const tile = new Tile(type, imgSrc, x, y)
				this.tileMap[i][j] = tile
			}
		}
	}

	update() {
	}

	render(ctx) {
		this.tileMap.forEach((list) => {
			list.forEach((tile) => {
				tile && tile.render(ctx)
			})
		})
	}

	getTileMap() {
		return this.tileMap
	}
}

function rnd(start, end) {
	return Math.floor(Math.random() * (end - start) + start)
}
