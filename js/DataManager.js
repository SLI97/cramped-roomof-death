import Pool from './base/pool'
import {
  level1,
  level2
} from './levels/level1'
import {DIRECTION_ENUM} from './enums'
import Singleton from './base/Singleton'

/**
 * 全局状态管理器
 */
export default class DataManager extends Singleton {

	static GetInstance() {
		return super.GetInstance(DataManager)
	}

  constructor() {
		super()
	  this.levelIndex = 1

    // console.log(this.level)

    this.offset = {
      width: 0,
      height: 0
    }

	  this.enemiesInfo = this.level.enemiesInfo
	  this.playerInfo = this.level.playerInfo
	  this.mapInfo = this.level.mapInfo

	  this.mapRowCount = this.mapInfo.length
	  this.mapColumnCount = this.mapInfo[0].length || 0



	  this.histroyStack = [
	    {
	    	playerInfo:{
			    x: 1,
			    y: 1,
			    direction: DIRECTION_ENUM.RIGHT
		    },
		    enemies:[]
	    }
    ]


    // this.pool = new Pool()

    this.reset()
  }

  reset() {
	  this.level = `level${this.levelIndex}`
  	this.playerInfo = this.getLevel().playerInfo
    // this.frame = 0
    // this.score = 0
    // this.bullets = []
    // this.enemys = []
    // this.animations = []
    // this.gameOver = false
  }

	Revoke(){
  	const info = this.histroyStack.pop()
		this.playerInfo = info.playerInfo
		this.enemies = info.enemies
	}

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  // removeEnemey(enemy) {
  //   let temp = this.enemys.shift()

  //   temp.visible = false

  //   this.pool.recover('enemy', enemy)
  // }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  // removeBullets(bullet) {
  //   let temp = this.bullets.shift()

  //   temp.visible = false

  //   this.pool.recover('bullet', bullet)
  // }

  getMapInfo(){
	  return this.mapInfo
  }

  setMapInfo(info){
	  this.mapInfo = info
  }

  getMapCount(){
	  return {
	  	row:this.mapRowCount,
	  	column:this.mapColumnCount,
	  }
  }

  getPlayerInfo(info){
  	return this.playerInfo
  }

  setPlayerInfo(info){
  	this.playerInfo = info
  }

	getLevel() {
		return this.level
	}

  setLevel(level1){
	  this.level = level1
  }

	getLevelIndex(){
		return this.levelIndex
	}

  setLevelIndex(index){
  	this.levelIndex = index
  }

  getOffset(){
  	return this.offset
  }

	setOffset(disX,disY) {
		this.offset.width = disX
		this.offset.height = disY
	}
}
