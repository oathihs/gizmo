import {
 CylinderGeometry,
 Mesh as MeshNative
} from 'three'

import { Mesh } from './Mesh'

export class Cylinder extends Mesh {
  constructor (config) {
    super(config)
    this._geometry = config.geometry ? new CylinderGeometry(config.geometry.radiusTop, config.geometry.radiusBottom, config.geometry.height) : new CylinderGeometry(5, 5, 5)
    this._obj = new MeshNative(this._geometry, this._material)
    this._class = 'Cylinder'
  }

  get $radiusTop () {
    return this._geometry.parameters.radiusTop
  }

  set $radiusTop (val) {
    this.$geometry = new CylinderGeometry(val, this.$radiusBottom, this.$height)
  }

  get $radiusBottom () {
    return this._geometry.parameters.radiusBottom
  }

  set $radiusBottom (val) {
    this.$geometry = new CylinderGeometry(this.$radiusTop, val, this.$height)
  }

  get $height () {
    return this._geometry.parameters.height
  }

  set $height (val) {
    this.$geometry = new CylinderGeometry(this.$radiusTop, this.$radiusBottom, val)
  }
}
