export default class Singleton {
	static _instance

	static GetInstance(T) {
		if (this._instance == null) {
			this._instance = new T()
		}
		return this._instance
	}

}
