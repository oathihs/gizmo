import {
  Camera as CameraNative,
  Vector3
} from 'three'

import { Element } from '../core/index'

export class Camera extends Element {
  constructor (config) {
    super()
    this._obj = new CameraNative()
    this._initial = {
      position: config.position,
      lookAt: {x: 0, y: 0, z: 0}
    }
    if (config.lookAt) this._initial.lookAt = config.lookAt
  }

  lookAt (position) {
    let vector = new Vector3(position[0], position[1], position[2])
    this._obj.lookAt(vector)
    return this
  }

  init () {
    this._obj.position.set(this._initial.position.x, this._initial.position.y, this._initial.position.z)
    this._obj.lookAt(new Vector3(this._initial.lookAt.x, this._initial.lookAt.y, this._initial.lookAt.z))
    return this
  }
  // TODO: parameters watcher
}

