import Singleton from '../base/Singleton'

/**
 * 统一的音效管理器
 */
export default class MusicManager extends Singleton {

	static GetInstance() {
		return super.GetInstance(MusicManager)
	}


  constructor() {
		super()

    // this.bgmAudio = new Audio()
    // this.bgmAudio.loop = true
    // this.bgmAudio.src  = 'audio/bgm.mp3'
		//
    // this.shootAudio     = new Audio()
    // this.shootAudio.src = 'audio/bullet.mp3'
		//
    // this.boomAudio     = new Audio()
    // this.boomAudio.src = 'audio/boom.mp3'
		//
    // this.playBgm()
  }

  // playBgm() {
  //   this.bgmAudio.play()
  // }
	//
  // playShoot() {
  //   this.shootAudio.currentTime = 0
  //   this.shootAudio.play()
  // }
	//
  // playExplosion() {
  //   this.boomAudio.currentTime = 0
  //   this.boomAudio.play()
  // }
}
