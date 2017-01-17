import {
 CylinderGeometry,
 Mesh as MeshNative
} from 'three'

import { Mesh } from './Mesh'

export class Cylinder extends Mesh {
  constructor (config) {
    super(config)

    let options = {}
    options.radiusTop = config.geometry.radiusTop || 5
    options.radiusBottom = config.geometry.radiusBottom || 5
    options.height = config.geometry.height || 5
    options.radiusSegments = config.geometry.radiusSegments || 8
    options.heightSegments = config.geometry.heightSegments || 1
    options.openEnded = config.geometry.openEnded || false
    options.thetaStart = config.geometry.thetaStart || 0
    options.thetaLength = config.geometry.thetaLength || Math.PI * 2

    this._geometry = new CylinderGeometry(options.radiusTop, options.radiusBottom, options.height, options.radiusSegments, options.heightSegments, options.openEnded, options.thetaStart, options.thetaLength)
    this._obj = new MeshNative(this._geometry, this._material)
    this._obj.name = 'cylinder'
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
