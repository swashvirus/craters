import {loadImage} from './Image.js'
import {Sound as loadAudio} from './Audio'
import {loadData} from './Json.js'

export default class Assets {
	constructor(resources) {
		let image = new loadImage()
		let audio = new loadAudio()
		let data = new loadData()

		return new Object({
			image,
			audio,
			data
		})
	}
};