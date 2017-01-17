import {
  PerspectiveCamera as PerspectiveCameraNative
} from 'three'

import { Camera } from './Camera'

export class PerspectiveCamera extends Camera {
  constructor (config) {
    super(config)
    this._obj = new PerspectiveCameraNative(
      config.camera.fov,
      config.camera.aspect,
      config.camera.near,
      config.camera.far
    )
    this._obj.name = 'Perspective Camera'
    this.init()
  }
}

