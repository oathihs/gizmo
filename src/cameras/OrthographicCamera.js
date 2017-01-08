import {
  OrthographicCamera as OrthographicCameraNative
} from 'three'

import { Camera } from './Camera'

export class OrthographicCamera extends Camera {
  constructor (config) {
    super(config)
    this._obj = new OrthographicCameraNative(
      config.camera.left,
      config.camera.right,
      config.camera.top,
      config.camera.bottom,
      config.camera.near,
      config.camera.far
    )
    this.init()
  }
}

