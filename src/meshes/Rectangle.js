// Rectangle

import {
  PlaneGeometry,
  Mesh as MeshNative
} from 'three'
import { Mesh } from './Mesh'

export class Rectangle extends Mesh {
  constructor (config) {
    super(config)
    this._geometry = config.geometry ? new PlaneGeometry(config.geometry.width, config.geometry.height) : new PlaneGeometry(5, 5)
    this._obj = new MeshNative(this._geometry, this._material)
    this._obj.name = 'rectangle'
    this._class = 'Rectangle'
  }

  get $width () {
    return this._geometry.parameters.width
  }

  set $width (val) {
    this.$geometry = new PlaneGeometry(val, this.$height)
  }

  get $height () {
    return this._geometry.parameters.height
  }

  set $height (val) {
    this.$geometry = new PlaneGeometry(this.$width, val)
  }
}