import {
 BoxGeometry,
 Mesh as MeshNative
} from 'three'

import { Mesh } from './Mesh'

export class Box extends Mesh {
  constructor (config) {
    super(config)

    let options = {}
    options.width = config.geometry.width || 5
    options.height = config.geometry.height || 5
    options.depth = config.geometry.depth || 5

    this._geometry = new BoxGeometry(options.width, options.height, options.depth)
    this._obj = new MeshNative(this._geometry, this._material)
    this._obj.name = 'box'
    this._class = 'Box'
  }

  get $width () {
    return this._geometry.parameters.width
  }

  set $width (val) {
    this.$geometry = new BoxGeometry(val, this.$height, this.$depth)
  }

  get $height () {
    return this._geometry.parameters.height
  }

  set $height (val) {
    this.$geometry = new BoxGeometry(this.$width, val, this.$depth)
  }

  get $depth () {
    return this._geometry.parameters.depth
  }

  set $depth (val) {
    this.$geometry = new BoxGeometry(this.$width, this.$height, val)
  }
}
