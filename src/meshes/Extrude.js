import {
  Shape,
  ExtrudeGeometry,
  Mesh as MeshNative
} from 'three'

import { Mesh } from './Mesh'

export class Extrude extends Mesh {
  constructor (config) {
    super(config)
    if (config.geometry) {
      let shape = new Shape()
      let pts = config.geometry.points
      shape.moveTo(pts[0][0], -pts[0][1])
      pts.forEach((pt, index) => { if (index > 0) shape.lineTo(pt[0], -pt[1]) })
      let options = config.geometry.options ? config.geometry.options : { amout: 5 }
      this._geometry = new ExtrudeGeometry(shape, options)
      this._obj = new MeshNative(this._geometry, this._material)
      this._obj.name = 'extrude'
      this._class = 'Extrude'
    }
  }
}

