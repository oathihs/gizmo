// Rectangle

import {
  RingGeometry,
  Mesh as MeshNative
} from 'three'
import { Mesh } from './Mesh'

export class Ring extends Mesh {
  constructor (config) {
    super(config)
    if (config.geometry) {
      let options = {}
      options.innerRadius = config.geometry.innerRadius || 1
      options.outerRadius = config.geometry.outerRadius || 50
      options.thetaSegments = config.geometry.thetaSegments || 8
      options.phiSegments = config.geometry.phiSegments || 8
      options.thetaStart = config.geometry.thetaStart || 0
      options.thetaLength = config.geometry.thetaLength || Math.PI * 2
      this._geometry = new RingGeometry(options.innerRadius, options.outerRadius, options.thetaSegments, options.phiSegments, options.thetaStart, options.thetaLength)
    } else this._geometry = new RingGeometry()
    this._obj = new MeshNative(this._geometry, this._material)
    this._class = 'Rectangle'
  }

  get $innerRadius () {
    return this._geometry.parameters.innerRadius
  }

  set $innerRadius (val) {
    this.$geometry = new RingGeometry(val, this.$outerRadius, this.$thetaSegments, this.$phiSegments, this.$thetaStart, this.$thetaLength)
  }

  get $outerRadius () {
    return this._geometry.parameters.outerRadius
  }

  set $outerRadius (val) {
    this.$geometry = new RingGeometry(this.$innerRadius, val, this.$thetaSegments, this.$phiSegments, this.$thetaStart, this.$thetaLength)
  }

  get $thetaSegments () {
    return this._geometry.parameters.thetaSegments
  }

  set $thetaSegments (val) {
    this.$geometry = new RingGeometry(this.$innerRadius, this.$outerRadius, val, this.$phiSegments, this.$thetaStart, this.$thetaLength)
  }

  get $phiSegments () {
    return this._geometry.parameters.phiSegments
  }

  set $phiSegments (val) {
    this.$geometry = new RingGeometry(this.$innerRadius, this.$outerRadius, this.$thetaSegments, val, this.$thetaStart, this.$thetaLength)
  }

  get $thetaStart () {
    return this._geometry.parameters.thetaStart
  }

  set $thetaStart (val) {
    this.$geometry = new RingGeometry(this.$innerRadius, this.$outerRadius, this.$thetaSegments, this.$phiSegments, val, this.$thetaLength)
  }

  get $thetaLength () {
    return this._geometry.parameters.thetaLength
  }

  set $thetaLength (val) {
    this.$geometry = new RingGeometry(this.$innerRadius, this.$outerRadius, this.$thetaSegments, this.$phiSegments, this.$thetaStart, val)
  }
}